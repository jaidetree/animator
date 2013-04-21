/**
 * Animation Factory
 *
 * Responsible for producing animation classes based on
 * the animation data supplied to the create method.
 *
 * TODO: Add method to register new types.
 */
Animator.namespace('animationFactory');
Animator.animationFactory = (function($, _) {

    var types = {
        sprite: Animator.animations.DefaultAnimation,
        auto: Animator.animations.AutoAnimation
    };

    /**
     * Uses an animation file's type object value to get a animation class
     * from the types variable.
     */
    function publicCreate(animationObject) {
        var animationClass = new types[animationObject.type]( animationObject );
        return animationClass;
    }


    return {
        create: publicCreate
    };
}(jQuery, _));
