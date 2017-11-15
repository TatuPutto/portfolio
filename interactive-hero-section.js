(function () {
    var CyclingHeroSection = function () {
        this.$parentUl = $('.home__nav-menu > ul');
        this.$parentDiv = $('.home__background-images');
        this.$links = $('.home__nav-menu > ul > li');
        this.$images = $('.home__background-image');
        this.$activeLink = null;
        this.$activeImage = null;
        this.interval = null;
        this.isCycling = true;
        this.intervalDuration = $('.home__nav-menu').data('data-interval') || 6000;
        this.transitionDuration = 800;
    }


    CyclingHeroSection.prototype.handleHover = function (e) {
        this.pause();
        var activeIndex = this.$parentDiv.find('.active').index();
        var nextIndex = $(e.target).data('scroll-to');

        if(nextIndex !== activeIndex) {
            this.setNextActiveImageAndLink(nextIndex);
        }
    }

    CyclingHeroSection.prototype.setNextActiveImageAndLink = function (nextIndex) {
        this.getActiveImageAndLink();

        if(nextIndex != undefined) {
            this.$activeLink.removeClass('active');
            this.$activeImage.removeClass('active');
            $(this.$links[nextIndex]).addClass('active');
            $(this.$images[nextIndex]).addClass('active');
        } else {
            var nextIndex = this.$parentUl.find('.active').index() + 1;
            this.$activeLink.removeClass('active');
            this.$activeImage.removeClass('active');

            if(nextIndex < this.$links.length) {
                $(this.$links[nextIndex]).addClass('active');
                $(this.$images[nextIndex]).addClass('active');
            } else {
                $(this.$links[0]).addClass('active');
                $(this.$images[0]).addClass('active');
            }
        }
    }

    CyclingHeroSection.prototype.getActiveImageAndLink = function (nextIndex) {
        this.$activeLink = this.$parentUl.find('.active');
        this.$activeImage = this.$parentDiv.find('.active');
    }

    CyclingHeroSection.prototype.cycle = function () {
        var _this = this;

        this.interval = setInterval(function () {
            if(_this.isCycling) {
                _this.setNextActiveImageAndLink();
            }
        }, this.intervalDuration);
    }

    CyclingHeroSection.prototype.pause = function () {
        this.isCycling = false;
        clearInterval(this.interval);
    }

    CyclingHeroSection.prototype.resume = function () {
        this.isCycling = true;
        this.cycle();
    }

    CyclingHeroSection.prototype.getNextIndex = function () {
        if((this.nextIndex + 1) < (this.$images.length)) {
            this.prevIndex = this.nextIndex;
            this.nextIndex++;
        } else {
            this.prevIndex = this.$images.length - 1;
            this.nextIndex = 0;
        }
    }

    CyclingHeroSection.prototype.changeActiveNavLink = function () {
        var $prevActiveLink = $(this.$links[this.prevIndex]);
        var $nextActiveLink = $(this.$links[this.nextIndex]);

        $prevActiveLink.removeClass('active');
        $nextActiveLink.addClass('active');
    }

    CyclingHeroSection.prototype.changeActiveImage = function () {
        var $prevImage = $(this.$images[this.prevIndex]);
        var $nextImage = $(this.$images[this.nextIndex]);

        $prevImage.removeClass('active');

        setTimeout(function () {
            $nextImage.addClass('active');
        }, (this.transitionDuration - 200));
    }

    var heroSection = new CyclingHeroSection();
    heroSection.cycle();

    $('.home__nav-menu > ul > li')
        .on('mouseenter', $.proxy(heroSection.handleHover, heroSection))
        .on('mouseleave', $.proxy(heroSection.resume, heroSection));
}());
