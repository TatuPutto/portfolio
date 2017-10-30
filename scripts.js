var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;
var $document = $(document);
var $body = $('body');
var $header = $('.sticky-header');
var $overlay = $('.carousel-overlay');
var $activeCarousel = null;
var scrollPosition;
var scrollTimeout = null;
var activeProject = 1;


$(document).ready(function () {
    setLandingPageHeight();
    $body.addClass('ready');

    // make header fixed onload if scrolled beyond landing page
    if($document.scrollTop() > ($('.home__navigation-container').offset().top)) {
        handleScroll();
    }

    //shouldAnimateLandingPageNavigation();
    animateLandingPageNavigation();

    setTimeout(function () {
        $header.removeClass('hidden');
        $overlay.removeClass('hidden');
    }, 500);
});

function setLandingPageHeight() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
}

function shouldAnimateLandingPageNavigation() {
    if($document.scrollTop() < $('#home').height()) {
        animateLandingPageNavigation();
    } else {
        showLandingPageNavigationWithoutAnimation();
    }
}

function animateLandingPageNavigation() {
    var i = 0;
    var animationInterval;

    setTimeout(function () {
        animationInterval = setInterval(function () {
            if(i <= 5) {
                $('.home__nav-menu > ul > li:nth-child(' + i + ')').removeClass('hidden-right');
                i++;
            } else {
                clearInterval(animationInterval);
            }
        }, 200);
    }, 500)
}

function showLandingPageNavigationWithoutAnimation() {
    $('.nav-menu > li').removeClass('hidden-right');
}

// check for scroll, but only react after user has stopped scrolling (50 ms)
$(document).on('scroll', function () {
    if(scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        handleScroll();
    }, 50);
});

$(window).on('resize', function () {
    setLandingPageHeight();
    $activeCarousel = $overlay.find('.active-carousel > .carousel-inner');
    $activeCarousel.css('height', (viewportHeight - 50 - 50 - 30 - 30));
});

function handleScroll() {
    toggleHeaderPosition();
    setActiveNavMenuIndex();
}

function toggleHeaderPosition() {
    var projectsSectionOffsetTop = $('#projects').offset().top - 5;

    if($document.scrollTop() > projectsSectionOffsetTop &&
       !$header.hasClass('fixed') && !$overlay.hasClass('open')) {
        $header.addClass('fixed');
        //$header.removeClass('faded-out');
    } else if($document.scrollTop() <= projectsSectionOffsetTop ||
              $overlay.hasClass('open')) {
        $header.removeClass('fixed');
        //$header.addClass('faded-out');
    }
}

function setActiveNavMenuIndex() {
    var halfway = $document.scrollTop() + (viewportHeight / 3);
    var projectsSectionOffset = $('#projects').offset().top;
    var aboutSectionOffset = $('#about').offset().top;
    var contactSectionOffset = $('#contact-info').offset().top - 150;
    var skillsSectionOffset = $('#skills').offset().top;

    $('.header__nav-menu > ul > li.active-section').removeClass('active-section');
    if(halfway < projectsSectionOffset) {
        setPeriodicBackgroundImageChange();
        $('.header__nav-menu > ul > li:first-child').addClass('active-section');
    } else if(halfway >= skillsSectionOffset) {
        $('.header__nav-menu > ul > li:nth-child(5)').addClass('active-section');
    } else if(halfway >= contactSectionOffset) {
        $('.header__nav-menu > ul > li:nth-child(4)').addClass('active-section');
    } else if(halfway >= aboutSectionOffset) {
        $('.header__nav-menu > ul > li:nth-child(3)').addClass('active-section');
    } else if(halfway >= projectsSectionOffset) {
        // stop changing landing-page background image
        clearInterval(backgroundImageChangeInterval);
        $('.header__nav-menu > ul > li:nth-child(2)').addClass('active-section');
    }

    if($document.scrollTop() >= skillsSectionOffset - 500) inflateBars();
}

function inflateBars() {
    $('.skills__bar').removeClass('deflated');
}

function scrollToSection(section) {
    var sections = $('section');
    var offset = (section === 3 ? viewportHeight / 3 : 0);
    var scrollTo = $(sections[section]).offset().top - offset;

    $('html, body').animate({scrollTop: scrollTo}, 800, function() {
        if(section === 3) {
            $('#contact-info').addClass('highlight');
            setTimeout(function () {
                $('#contact-info').removeClass('highlight');
            }, 400);
        }
    });
}


function showAdditionalDetails(projectNum) {
    var projectIdSelector = '#project-' + projectNum;
    var $additionalInfoContainer = $(projectIdSelector +
            ' .project__additional-info');
    var $additionalInfoVisibilityIndicator = $(projectIdSelector +
            ' .project__toggle-additional-info > i');

    if($additionalInfoContainer.hasClass('open')) {
        $additionalInfoContainer.removeClass('open');
        $additionalInfoVisibilityIndicator.removeClass('open');
    } else {
        $additionalInfoContainer.addClass('open');
        $additionalInfoVisibilityIndicator.addClass('open');
    }
}

function openImageCarouselOverlay(carouselId) {
    $activeCarousel = $(carouselId);

    $(carouselId).addClass('active-carousel');
    $header.removeClass('fixed');
    $overlay.addClass('open');
    $body.css('overflow-y', 'hidden');
    $body.css('background-color', '#3c3c3c');
    fitImageCarousel(carouselId);
}

function closeCarouselOverlay() {
    $activeCarousel = $overlay.find('.active-carousel');

    $header.addClass('fixed');
    $overlay.removeClass('open');
    $activeCarousel.removeClass('.active-carousel');
    $activeCarousel.css('display', 'none');
    $body.css('overflow-y', 'scroll');
    $body.css('background-color', 'initial');
}

function fitImageCarousel(carouselId) {
    $activeCarousel.find('.carousel-inner').css('height', (viewportHeight - 50 - 50 - 30 - 30));
    $activeCarousel.css('display', 'block');
    $overlay.css('display', 'block');
}

function toggleGif() {
    var $thumbnailContainer = $('#project-4 .project__thumbnail-container');
    var $gifWrapper = $('#project-4 .gif-wrapper');
    var $image = $('#project-4 .project__thumbnail');

    if($($thumbnailContainer).hasClass('play-gif')) {
        $thumbnailContainer.removeClass('play-gif');
        $thumbnailContainer.addClass('gif-loading');

        var gif = new Image();
        gif.onload = function() {
            $thumbnailContainer.removeClass('gif-loading');
            $thumbnailContainer.addClass('stop-gif');
            $gifWrapper.addClass('gif-playing');

            setTimeout(function () {
                $image.attr('src', this.src);
            }.bind(this), 300);
        };
        gif.src = './images/game-of-life-showcase-large.gif';
    } else {
        $thumbnailContainer.removeClass('stop-gif');
        $thumbnailContainer.addClass('play-gif');
        $gifWrapper.removeClass('gif-playing');
        $image.attr('src', './images/game-of-life-showcase-large.png');
    }
}


var touchStartPointX = null;
var touchStartPointY = null;
var touchMovePointX = null;
var touchMovePointY = null;

$('.header__nav-menu, .home__nav-menu').on('touchstart click', function (e) {
    if(e.type == 'touchstart') {
        touchStartPointX = e.originalEvent.touches[0].clientX;
        touchStartPointY = e.originalEvent.touches[0].clientY;
    } else {
        getSectionId(e.target);
    }
});

$('.header__nav-menu, .home__nav-menu').on('touchmove', function (e) {
    touchStartPointX = e.originalEvent.touches[0].clientX;
    touchStartPointY = e.originalEvent.touches[0].clientY;
});

$('.header__nav-menu, .home__nav-menu').on('touchend', function (e) {
    // only scroll to target section on touch (ignore swipe)
    if(touchStartPointX === touchMovePointX && touchStartPointY === touchMovePointY) {
        getSectionId(e.target);
    }
});

function getSectionId(target) {
    if(target && target.nodeName == 'LI' || target.nodeName == 'I' || target.nodeName == 'DIV') {
        if(target.nodeName == 'DIV') {
            target = target.parentElement;
        } else if(target.nodeName == 'I' && target.parentElement.nodeName == 'DIV') {
            target = target.parentElement.parentElement;
        } else if(target.nodeName == 'I') {
            target = target.parentElement;
        }

        var data = $(target).data('scroll-to');
        return scrollToSection(data);
    }
}

(function initCarouselForTouchDevices() {
    var touchStartPointX = null;
    var touchMovePointX = null;

    if(supportsTouch) {
        // hide carousel controls and use swiping instead to spin the carousel
        $('.carousel-controls').css('display', 'none');
        $('.carousel').on('touchstart', function (e) {
            touchStartPointX = e.originalEvent.touches[0].clientX;
            touchMovePointX = e.originalEvent.touches[0].clientX;
        });

        $('.carousel').on('touchmove', function (e) {
            touchMovePointX = e.originalEvent.touches[0].clientX;
        });

        $('.carousel').on('touchend', function (e) {
            var $targetCarousel = $(e.currentTarget);
            var targetCarouselId = $targetCarousel.attr('id');

            if(touchStartPointX !== touchMovePointX && Math.abs(touchStartPointX - touchMovePointX) > 100) {
                var swipedLeft = (touchStartPointX - touchMovePointX > 0) ? true : false;
                var images = $targetCarousel.find('.item');
                var activeImage = $('#' + targetCarouselId + ' .active').index();
                var nextImage = 1;
                var hasPreviousImage = (activeImage - 1) >= 0 ? activeImage - 1 : images.length - 1;
                var hasNextImage = (activeImage + 1) < images.length ? activeImage + 1 : 0;
                nextImage = swipedLeft ? hasNextImage : hasPreviousImage;

                $targetCarousel.carousel(nextImage);
            }
        });
    }
}());

$('.home__nav-menu > ul > li').on('mouseenter', function (e) {
    clearInterval(backgroundImageChangeInterval);
    nextImageIndex = $(e.target).data('scroll-to');

    if(activeImageIndex !== nextImageIndex) {
        $('.home__nav-menu > ul > li.active').removeClass('active');
        changeHomeBackground(nextImageIndex);
    }
});

$('.home__nav-menu > ul > li').on('mouseleave', function (e) {
    // retrigger automatic scroll
    if(nextImageIndex < 4) {
        nextImageIndex++;
    } else {
        nextImageIndex = 0;
    }

    setPeriodicBackgroundImageChange();
});

var backgroundImageChangeInterval = null;
var changeHomeBackgroundImageTimeout = null;
var activeImageIndex = 0;
var nextImageIndex = 1;
/*
setTimeout(function () {
    updateHomeSection();
    setPeriodicBackgroundImageChange();
}, 5000);
*/
function setPeriodicBackgroundImageChange() {
    backgroundImageChangeInterval = setInterval(updateHomeSection, 5200);
}

function updateHomeSection() {
    changeHomeBackground(nextImageIndex);
    setListItemActive(nextImageIndex);
    activeImageIndex = nextImageIndex;

    if(nextImageIndex < 4) {
        nextImageIndex++;
    } else {
        nextImageIndex = 0;
    }
}

function setListItemActive(nextImageIndex) {
    var activeListItem = nextImageIndex;
    var nextActiveListItem = nextImageIndex + 1;

    if(nextImageIndex === 0) {
        activeListItem = 5;
        nextActiveListItem = 1;
    }

    $('.home__nav-menu > ul > li:nth-child(' + activeListItem + ')').removeClass('active');
    $('.home__nav-menu > ul > li:nth-child(' + nextActiveListItem + ')').addClass('active');

}

function changeHomeBackground(nextImageIndex) {
    var backgroundImages = [
        //'http://c7.alamy.com/comp/FAMTWT/laptop-computer-works-web-programmer-at-work-men-browsing-website-FAMTWT.jpg',
        //'./images/placeholder.png',
        './images/projects.png',
        './images/image.jpeg',
        './images/wordcloud.png',
        './images/contact.png',
        './images/skills.png'
    ];
    var nextImage = new Image();

    var $backgroundImage = $('.home__background-image');
    $backgroundImage.addClass('fade-out');

    if(changeHomeBackgroundImageTimeout) {
        clearTimeout(changeHomeBackgroundImageTimeout);
    }

    changeHomeBackgroundImageTimeout = setTimeout(function () {
        nextImage.onload = function () {
            $backgroundImage.attr('src', this.src);
            $backgroundImage.removeClass('fade-out');
        }
        nextImage.src = backgroundImages[nextImageIndex];
    }, 1200);

}
