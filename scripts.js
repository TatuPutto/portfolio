(function setImageAspectRatio() {
    var thumbnails = $('img');
    var height = thumbnails[0].offsetWidth / 4 * 3;
    //console.log(document.getElementsByClassName('thumbnail-container')[0].offsetWidth);
    for(var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.height = height + 'px';
    }
})();

function showLargePicture() {
    $(document.body).append('<div class="image-carousel"><img class="project-image-large" src="./images/gist-management-app-front.png"/></div>');

    setTimeout(function () {
        $(document.body).on('click', function () {
            $('.image-carousel').remove();
            $(document.body).off('click');
        });
    }, 100);
}
