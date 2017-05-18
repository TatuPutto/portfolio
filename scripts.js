/*$(document).ready(function () {
    setTimeout(function () {
        var carouselImages = $('.item');

        for(var i = 0; i < carouselImages.length; i++) {
            var parentHeight = $('.carousel-inner').height();
            var image = $(carouselImages[i]);
            var imageHeight = image.height();
            var marginTop = (parentHeight - imageHeight) / 2;

            image.css('margin-top', marginTop);
        }
    }, 100);
});*/
/*

$(document).ready(function () {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    $('section').css('height', viewportHeight - 48);
    $('#gist-management-app-pic-carousel').css('height', viewportHeight - 160);
    $('#food-diary-img-carousel').css('height', viewportHeight - 160);
    $('#game-of-life-pic-carousel').css('height', viewportHeight - 160);
});
*/
/*
var timeout = null;
$(document).scroll(function () {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        scrollToClosestSection();
    }, 500);
});

function scrollToClosestSection() {
    var distanceToAbout = Math.abs($('#about').offset().top - $(document).scrollTop());
    var distanceToSkills = Math.abs($('#skills').offset().top - $(document).scrollTop());
    var distanceToProjects = Math.abs($('#projects').offset().top - $(document).scrollTop());
    var closestSection;

    if(distanceToAbout > distanceToSkills) {
        closestSection = '#skills';
        if(distanceToSkills > distanceToProjects) {
            closestSection = '#projects';
        }
    } else if(distanceToSkills > distanceToAbout) {
        closestSection = '#about';
        if(distanceToAbout > distanceToProjects) {
            closestSection = '#projects';
        }
    }

    $('body').animate({scrollTop: $(closestSection).offset().top - 50}, '800', 'swing');
}

*/

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

function showLargePicture(element) {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if(viewportWidth < 992) {
        return;
    }

    var naturalWidth = element.naturalWidth;
    var naturalHeight = element.naturalHeight;
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

    $('.project-image-large img').css('width', newWidth);
    $('.project-image-large img').css('height', newHeight);
    $('.project-image-large img').css('margin-top', marginTop);
    $('.project-image-large img').css('margin-left', marginLeft);
    //if(naturalWidth > naturalHeight) {
        /*console.log('Leveämpi');
        var newWidth;
        var newHeight;

        if(naturalWidth > (viewportWidth - 200)) {
            console.log('joo');
            newWidth = viewportWidth - 100;
        }

        if(naturalHeight > viewportHeight) {
            newHeight = viewportHeight - 100;
        }



        console.log(newWidth + ' \n' +  newHeight);*/

        // leveydestä kiinni (original height / original width) x new width = new height

    /*} else {
        console.log('korkeampi');

        // leveydestä kiinni (original height / original width) x new height = new width
    }*/


    $('.overlay').css('display', 'inline');
    //$('.image-carousel img').attr('src', imageSrc);
    //$('.image-carousel').animate({opacity: 1}, 200);
    $('.project-image-large img').attr('src', element.src);
    $('.project-image-large').animate({opacity: 1}, 200);


    setTimeout(function () {
        $('.overlay').on('click', function () {
            $('.overlay').off('click');
            $('.project-image-large').animate({opacity: 0}, 200, function () {
                $('.overlay').css('display', 'none');
            });
        });
    }, 100);
}

function stopPropagation(event) {
    event.stopPropagation();
}

function scrollToSection(section) {
    var sectionSelector = '#' + section;
    $('body').animate({scrollTop: $(sectionSelector).offset().top - 50}, '500', 'swing');
}
