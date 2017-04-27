var gistManagementAppPics = [
    './images/gist-management-app-front.png',
    './images/gist-management-app-front-filtering.png',
    './images/gist-management-app-creategist.png',
    './images/gist-management-app-creategist-small.png'
];


var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

$(document).ready(function () {
    $('#projects').css('height', viewportHeight - 50);
    console.log(viewportHeight - 50);
});


/*
$(document).ready(function () {
    maintainImageAspectRatio();
});

$(window).resize(function () {
    maintainImageAspectRatio();
});


function maintainImageAspectRatio() {
    var thumbnails = $('img');
    var height = thumbnails[2].offsetWidth / 16 * 10;

    for(var i = 2; i < thumbnails.length; i++) {
        thumbnails[i].style.height = height + 'px';
    }
}
*/
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




function spin() {
    console.log('täällä');
    var lastActive = $('.carousel-item')[1];
    var activeItem = $('.carousel-item')[1];
    $(lastActive).removeClass('active');
    $(activeItem).addClass('active');
}
