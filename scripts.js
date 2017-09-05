var $document = $(document);
var $body = $('body');
var $header = $('.header');
var $overlay = $('.image-carousel-overlay');
var activeProject = 1;

$(document).ready(function () {
    $('#home').css('height', window.innerHeight);
    $('.container-fluid').addClass('ready');

    var i = 1;
    setTimeout(function () {
        setInterval(function () {
            $('.nav-menu > li:nth-child(' + i + ')').removeClass('hidden-right');
            i++;
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

function handleScroll() {
    toggleHeaderPosition();
    setActiveNavMenuIndex();
}

function toggleHeaderPosition() {
    var navPosition = $('.navigation').offset();

    if($document.scrollTop() > (navPosition.top) &&
       !$header.hasClass('fixed') && !$overlay.hasClass('open')) {
        $header.addClass('fixed');
    } else if($document.scrollTop() <= navPosition.top || $overlay.hasClass('open')) {
        $header.removeClass('fixed');
    }
}

function setActiveNavMenuIndex() {
    var projectsSectionPosition = $('#projects').offset();
    var skillsSectionPosition = $('#skills').offset();
    var aboutSectionPosition = $('#about').offset();

    $('.header-nav-menu > li.active-section').removeClass('active-section');
    if($document.scrollTop() < projectsSectionPosition.top - 50) {
        $('.header-nav-menu > li:first-child').addClass('active-section');
    } else if($document.scrollTop() >= aboutSectionPosition.top - 50) {
        $('.header-nav-menu > li:nth-child(4)').addClass('active-section');
    } else if($document.scrollTop() >= skillsSectionPosition.top - 50) {
        $('.header-nav-menu > li:nth-child(3)').addClass('active-section');
    } else if($document.scrollTop() >= projectsSectionPosition.top - 50) {
        $('.header-nav-menu > li:nth-child(2)').addClass('active-section');
    }

    if($document.scrollTop() >= skillsSectionPosition.top - 300) inflateBars();
}

function scrollToSection(section) {
    $body.animate({
        scrollTop: $('section:nth-child(' + section + ')').offset().top - 50
    }, 500);
}

function inflateBars() {
    $('.bar').removeClass('deflated');
}

function showAdditionalDetails(projectNum) {
    var projectIdSelector = '#project-' + projectNum;
    var $additionalInfoContainer = $(projectIdSelector +
            ' .project-additional-info');
    var $additionalInfoVisibilityIndicator = $(projectIdSelector +
            ' .toggle-additional-details-view > i');

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

function closeImageCarouselOverlay() {
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
    var $thumbnailContainer = $('#project-4 .thumbnail-container');
    var $thumbnailOverlay = $('#project-4 .thumbnail-overlay');
    var $gifWrapper = $('#project-4 .gif-wrapper');
    var $image = $('#project-4 img');

    if($($thumbnailContainer).hasClass('gif-playing')) {
        $thumbnailOverlay.removeClass('stop-gif');
        $thumbnailOverlay.addClass('play-gif');
        $thumbnailContainer.removeClass('gif-playing');
        $gifWrapper.removeClass('gif-playing');
        $image.attr('src', './images/game-of-life-showcase-large.png');
    } else {
        $thumbnailOverlay.removeClass('play-gif');
        $thumbnailOverlay.addClass('stop-gif');
        $thumbnailContainer.addClass('gif-playing');
        $gifWrapper.addClass('gif-playing');
        $image.attr('src', './images/game-of-life-showcase-large.gif');
    }
}
