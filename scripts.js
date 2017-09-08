var viewportHeight = window.innerHeight;
var $document = $(document);
var $body = $('body');
var $header = $('header');
var $overlay = $('.carousel-overlay');
var activeProject = 1;

$(document).ready(function () {
    if(viewportHeight > 700) {
        $('#home').css('height', viewportHeight);
    }

    $('.container-fluid').addClass('ready');

    var i = 1;
    var animationInterval;
    setTimeout(function () {
        animationInterval = setInterval(function () {
            if(i <= 5) {
                $('.nav-menu > li:nth-child(' + i + ')').removeClass('hidden-right');
                i++;
            } else {
                clearInterval(animationInterval);
            }
        }, 200);
    }, 1000)
});

$(document).ready(function () {
    var scrollTimeout = null;
    var navPosition = $('.navigation').offset();

    // make header fixed onload if scrolled beyond landing page
    if($(document).scrollTop() > (navPosition.top)) {
        handleScroll();
    }

    // check for scroll, but only react after user has stopped scrolling (50 ms)
    $(document).on('scroll', function () {
        if(scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            handleScroll();
        }, 50);
    });
});

$(window).on('resize', function () {
    viewportHeight = window.innerHeight;
    $('#home').css('height', viewportHeight);
})

function handleScroll() {
    toggleHeaderPosition();
    setActiveNavMenuIndex();
}

function toggleHeaderPosition() {
    var projectsSectionOffsetTop = $('#projects').offset().top - 55;

    if($document.scrollTop() > projectsSectionOffsetTop &&
       !$header.hasClass('fixed') && !$overlay.hasClass('open')) {
        $header.addClass('fixed');
    } else if($document.scrollTop() <= projectsSectionOffsetTop ||
              $overlay.hasClass('open')) {
        $header.removeClass('fixed');
    }
}

function setActiveNavMenuIndex() {
    var halfway = $document.scrollTop() + (viewportHeight / 3);
    var projectsSectionOffset = $('#projects').offset().top;
    var aboutSectionOffset = $('#about').offset().top;
    var contactSectionOffset = $('#contact-info').offset().top;
    var skillsSectionOffset = $('#skills').offset().top;

    $('.header-nav-menu > li.active-section').removeClass('active-section');
    if(halfway < projectsSectionOffset) {
        $('.header-nav-menu > li:first-child').addClass('active-section');
    } else if(halfway >= skillsSectionOffset) {
        $('.header-nav-menu > li:nth-child(5)').addClass('active-section');
    } else if(halfway >= contactSectionOffset) {
        $('.header-nav-menu > li:nth-child(4)').addClass('active-section');
    } else if(halfway >= aboutSectionOffset) {
        $('.header-nav-menu > li:nth-child(3)').addClass('active-section');
    } else if(halfway >= projectsSectionOffset) {
        $('.header-nav-menu > li:nth-child(2)').addClass('active-section');
    }

    if($document.scrollTop() >= skillsSectionOffset - 500) inflateBars();
}

function scrollToSection(section) {
    var sections = $('section');
    var offset = (section === 3 ? viewportHeight / 3 : 50);
    var scrollTo = $(sections[section]).offset().top - offset;

    $body.animate({scrollTop: scrollTo}, 500, function() {
        if(section === 3) {
            $('#contact-info').addClass('highlight');
            setTimeout(function () {
                $('#contact-info').removeClass('highlight');
            }, 400);

        }
    });
}

function inflateBars() {
    $('.skills__bar').removeClass('deflated');
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
    $(carouselId).addClass('active-carousel')
    $header.removeClass('fixed');
    $overlay.addClass('open');
    $body.css('overflow-y', 'hidden');
    fitImageCarousel(carouselId);
}

function closeCarouselOverlay() {
    var $activeCarousel = $overlay.find('.active-carousel');

    $header.addClass('fixed');
    $overlay.removeClass('open');
    $activeCarousel.removeClass('.active-carousel');
    $activeCarousel.css('display', 'none');
    $body.css('overflow-y', 'scroll');
}

function fitImageCarousel(carouselId) {
    var viewportWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    );
    var viewportHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
    );
    var $activeCarousel = $(carouselId);
    var $activeImage = $(carouselId + ' .carousel-inner').find('.active img')[0];
    var naturalWidth = $activeImage.naturalWidth;
    var naturalHeight = $activeImage.naturalHeight;
    var aspectRatio = naturalWidth / naturalHeight;
    var newHeight = viewportHeight - 130;
    var newWidth = (naturalWidth / naturalHeight) * newHeight;
    var marginTop, marginLeft, exceedingWidth;

    if(newWidth > (viewportWidth - 200)) {
        exceedingWidth = newWidth - (viewportWidth - 200);
        newHeight -= (exceedingWidth / aspectRatio);
        newWidth = (naturalWidth / naturalHeight) * newHeight;
    }

    marginTop = (viewportHeight - newHeight) / 2;
    marginLeft = (viewportWidth - newWidth) / 2;

    $activeCarousel.css('width', newWidth);
    $activeCarousel.css('height', newHeight);
    $activeCarousel.css('margin-top', marginTop);
    $activeCarousel.css('margin-left', marginLeft);
    $activeCarousel.css('display', 'block');
    $overlay.css('display', 'block');
}

function toggleGif() {
    var $thumbnailContainer = $('#project-4 .project__thumbnail-container');
    var $gifWrapper = $('#project-4 .gif-wrapper');
    var $image = $('#project-4 img');

    if($($thumbnailContainer).hasClass('play-gif')) {
        $thumbnailContainer.removeClass('play-gif');
        $thumbnailContainer.addClass('stop-gif');
        $gifWrapper.addClass('gif-playing');
        $image.attr('src', './images/game-of-life-showcase-large.gif');
    } else {
        $thumbnailContainer.removeClass('stop-gif');
        $thumbnailContainer.addClass('play-gif');
        $gifWrapper.removeClass('gif-playing');
        $image.attr('src', './images/game-of-life-showcase-large.png');
    }
}
