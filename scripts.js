$(document).ready(function setImageAspectRatio() {
    var thumbnails = $('img');
    var height = thumbnails[1].offsetWidth / 4 * 3;
    //console.log(document.getElementsByClassName('thumbnail-container')[0].offsetWidth);
    for(var i = 1; i < thumbnails.length; i++) {
        thumbnails[i].style.height = height + 'px';
    }
});

function showLargePicture(imageSrc) {
    //$(document.body).append('<div class="overlay"><div class="image-carousel" onclick="stop(stopPropagation)"><img class="project-image-large" src="./images/gist-management-app-front.png"/></div></div>');
    $('.overlay').css('display', 'inline');
    $('.image-carousel img').attr('src', imageSrc);
    $('.image-carousel').animate({opacity: 1}, 300);

    setTimeout(function () {
        $('.overlay').on('click', function () {
            $('.overlay').off('click');
            $('.image-carousel').animate({opacity: 0}, 300, function () {
                $('.overlay').css('display', 'none');
            });
        });
    }, 100);
}

function stopPropagation(event) {
    event.stopPropagation();
}
