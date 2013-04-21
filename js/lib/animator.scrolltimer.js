/**
 * Scroll Based Animation Engine
 *
 * This animation timing engine works based on scroll position by
 * taking the scroll position and dividing it by the total width
 * or height to create a percentage.
 */
Animator.namespace('animation');
Animator.animation.ScrollEngine = (function ($, _) {
    var privateLastPosition = 0;
    var privateSettings = {
        direction: 'vertical'
    };
    var privateDirections = {
        vertical: scrollVertical,
        horizontal: scrollHorizontal
    };

    function init(animations, options) {
        this.options = $.extend(privateSettings, options);
        new Animator.modules.Controller(this, animations);
        $(window).scroll({instance: this}, scrollListener);
    }

    function scrollVertical(event) {
        var scrollTop = $(window).scrollTop(),
            height = $('body').height() - $(window).outerHeight(),
            percent = ( scrollTop / height ) * 100,
            direction = null;

        if ( privateLastPosition < percent ) {
            direction = "+";
        }
        else if ( privateLastPosition >= percent ) {
            direction = "-";
        } else {
            direction = null;
        }

        privateLastPosition = percent;

        return {
            position: scrollTop,
            total: height,
            windowSize: $(window).height(),
            documentSize: $(document.body).height(),
            percent: percent,
            direction: direction
        };
    }

    function scrollHorizontal(event) {
        var scrollValue = $(window).scrollLeft(),
            width = $('body').width() - $(window).outerWidth(),
            percent = ( scrollValue / width ) * 100,
            direction = null;

        if ( privateLastPosition < percent ) {
            direction = "+";
        }
        else if ( privateLastPosition >= percent ) {
            direction = "-";
        } else {
            direction = null;
        }

        privateLastPosition = percent;

        return {
            position: scrollValue,
            total: width,
            windowSize: $(window).outerWidth(),
            documentSize: $(document.body).outerWidth(),
            percent: percent,
            direction: direction
        };
    }

    function scrollListener(event) {
        var data = privateDirections[event.data.instance.options.direction](event);
        Animator.mediator.publish('tick', data);
    }

    return function(animations, options) {
        this.options = {};
        this.init = init;
        this.scrollListener = scrollListener;
        this.init(animations, options);
    };

})(jQuery, _);