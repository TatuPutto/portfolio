$(document).ready(() => {
    $('#home').css('height', window.innerHeight);
});

$(document).ready(() => {
    var navPosition = $('.navigation').offset();
    if($(document).scrollTop() > (navPosition.top)) toggleHeaderPosition();

    var scrollTimeout = null;
    $(document).on('scroll', () => {
        if(scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            toggleHeaderPosition();
        }, 50);
    });
});

function toggleHeaderPosition() {
    var navPosition = $('.navigation').offset();
    var projectsSectionPosition = $('#projects').offset();
    var skillsSectionPosition = $('#skills').offset();
    var _document = $(document);
    var header = $('.header');
    var overlay = $('.overlay');

    if(_document.scrollTop() > (navPosition.top) &&
       !header.hasClass('fixed') && overlay.hasClass('closed')) {
        header.addClass('fixed');
    } else if(_document.scrollTop() <= navPosition.top || overlay.hasClass('open')) {
        header.removeClass('fixed');
    }

    //
    $('.nav-menu > li.active').removeClass('active');
    if(_document.scrollTop() < projectsSectionPosition.top - 50) {
        $('.nav-menu > li:first-child').addClass('active');
    } else if(_document.scrollTop() >= skillsSectionPosition.top - 50) {
        $('.nav-menu > li:nth-child(3)').addClass('active');
    } else if(_document.scrollTop() >= projectsSectionPosition.top - 50) {
        $('.nav-menu > li:nth-child(2)').addClass('active');
    }
}

function scrollToSection(section) {
    $('body').animate(
        {scrollTop: $('section:nth-child(' + section + ')').offset().top - 50},
        500
    );
}

function stopPropagation(event) {
    event.stopPropagation();
}

var activeProject = 1;

function nextProject() {
    var currentProject = '#project-' + activeProject;
    var nextProject = '#project-' + (activeProject + 1);
    $(currentProject).css('position', 'absolute');
    $(nextProject).css('position', 'inherit');
    activeProject++;

    if(nextProject == '#project-3') {
        $('#project-3 .embed-container').html('<p data-height="100%" data-theme-id="0" data-slug-hash="NjWEOM" data-default-tab="result" data-user="TatuPutto" data-embed-version="2" data-pen-title="Game-of-life" class="codepen"></p>');

        var script = document.createElement('script');
        script.setAttribute('src', 'https://production-assets.codepen.io/assets/embed/ei.js');
        document.head.appendChild(script);
        $('.cp_embed_wrapper').css('height', '100%');
    } else if(currentProject == '#project-3') {
        $('#project-3 .embed-container').html('');
    }
}


function previousProject() {
    var currentProject = '#project-' + activeProject;
    var nextProject = '#project-' + (activeProject - 1);
    $(currentProject).css('position', 'absolute');
    $(nextProject).css('position', 'inherit');
    activeProject--;
}

function toggleOverlay(carouselId) {
    var overlay = $('.overlay');
    var header = $('.header');

    if(overlay.hasClass('open')) {
        overlay.removeClass('open');
        overlay.addClass('closed');
        toggleHeaderPosition();

        var activeCarousel = $('.active-carousel');
        activeCarousel.find('.active').removeClass('active');
        activeCarousel.find('.item').first().addClass('active');
        activeCarousel.css('display', 'none');
        activeCarousel.removeClass('active-carousel');
        $('body').css('overflow-y', 'scroll');
    } else {
        header.removeClass('fixed');
        overlay.removeClass('closed');
        overlay.addClass('open');
        $(carouselId).addClass('active-carousel');
        $('body').css('overflow-y', 'hidden');
        showLargePicture(carouselId);
    }
}

function showLargePicture(carouselId) {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //if(viewportWidth < 992) return;

    var activeImage = $(carouselId + ' .carousel-inner').find('.active img')[0];

    var naturalWidth = activeImage.naturalWidth;
    var naturalHeight = activeImage.naturalHeight;
    var aspectRatio = naturalWidth / naturalHeight;

    var newWidth;
    var newHeight = viewportHeight - 100;
    newWidth = (naturalWidth / naturalHeight) * newHeight;

    if(newWidth > (viewportWidth - 200)) {
        var exceedingWidth = newWidth - (viewportWidth - 200);
        newHeight -= (exceedingWidth / aspectRatio);
        newWidth = (naturalWidth / naturalHeight) * newHeight;
    }

    var marginTop = (viewportHeight - newHeight) / 2;
    var marginLeft = (viewportWidth - newWidth) / 2;

    $(carouselId).css('width', newWidth);
    $(carouselId).css('height', newHeight);
    $(carouselId).css('margin-top', marginTop);
    $(carouselId).css('margin-left', marginLeft);
    $(carouselId).css('display', 'block');

    $('.overlay').css('display', 'inline');
    $('.project-image-large img').attr('src', activeImage.src);
    $('.project-image-large').animate({opacity: 1}, 200);
}
