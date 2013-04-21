/**
 * Animation Controller
 *
 * Controls loading the animations and orchestrating their instantiation.
 *
 * This object is created from within a Timing Engine.
 */
Animator.namespace('modules');
Animator.modules.Controller = (function($, _){
    var animations = [];

    function publicInit(timingEngine, animationList) {
        Animator.mediator.subscribe('setupAnimation', privateSetupAnimation, this);
        Animator.mediator.subscribe('animationsLoaded', privateLoadingComplete, this);

        this.timingEngine = timingEngine;

        for (var i = 0; i < animationList.length; i++) {
            privateLoadAnimation({
                file: animationList[i],
                index: i,
                total: animationList.length
            });
        }
    }

    function privateLoadAnimation(animationData) {
        $.getJSON('js/animations/' + animationData.file + '.js', function(data){
            Animator.mediator.publish('setupAnimation', {
                animation: data,
                index: animationData.index,
                total: animationData.total,
                file: animationData.file
            });
        });
    }

    function privateSetupAnimation(data) {
        var animationObject = data.animation;
        animationObject = Animator.animationFactory.create(animationObject);
        animations.push(animationObject);

        if (data.index === data.total - 1) {
            Animator.mediator.publish('animationsLoaded', this);
        }
    }

    function privateLoadingComplete(controller) {
        // All animations are loaded
    }

    return function(timingEngine, animations) {
        this.init = publicInit;
        this.init(timingEngine, animations);
    };
})(jQuery, _);