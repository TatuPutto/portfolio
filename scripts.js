var gistManagementAppPics = [
    './images/gist-management-app-front.png',
    './images/gist-management-app-front-filtering.png',
    './images/gist-management-app-creategist.png',
    './images/gist-management-app-front.png'
];

$(document).ready(function () {
    maintainImageAspectRatio();
});

$(window).resize(function () {
    maintainImageAspectRatio();
});

function maintainImageAspectRatio() {
    var thumbnails = $('img');
    var height = thumbnails[2].offsetWidth / 4 * 3;

    for(var i = 2; i < thumbnails.length; i++) {
        thumbnails[i].style.height = height + 'px';
    }
}

var currentPic = 0;
function rotateImageCarousel(imageNum, method) {
    currentPic = calcNextPic(currentPic, imageNum, method);

    $('#gist-management-app-pic').animate({opacity: 0}, 200, function () {
        $('#gist-management-app-pic').attr('src', gistManagementAppPics[currentPic]);
        $('#gist-management-app-pic').animate({opacity: 1}, 200);

        $('.carousel-img-indicator').attr('class', 'fa fa-circle-thin carousel-img-indicator');
        var activeIndicator = $('.carousel-img-indicator')[currentPic];
        $(activeIndicator).attr('class', 'fa fa-circle carousel-img-indicator');
    });

}

function calcNextPic(currentPic, imageNum, method) {

    if(!imageNum && method == 'increment') {
        if(currentPic < gistManagementAppPics.length - 1) {
            currentPic++;
        } else {
            currentPic = 0;
        }
    } else if(!imageNum && method == 'decrement') {
        if(currentPic > 0) {
            currentPic--;
        } else {
            currentPic = gistManagementAppPics.length - 1;
        }
    } else {
        currentPic = imageNum;
    }

    return currentPic;
}


function showLargePicture(imageSrc) {
    $('.overlay').css('display', 'inline');
    $('.image-carousel img').attr('src', imageSrc);
    $('.image-carousel').animate({opacity: 1}, 200);

    setTimeout(function () {
        $('.overlay').on('click', function () {
            $('.overlay').off('click');
            $('.image-carousel').animate({opacity: 0}, 200, function () {
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
    $('body').animate({scrollTop: $(sectionSelector).offset().top - 80}, '500', 'swing');
}
