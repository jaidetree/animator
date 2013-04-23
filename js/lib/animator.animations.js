/**
 * Available Animation Classes
 *
 * Define the various types of animations that you can setup
 * as animation files. Each class is also given implementation
 * notes.
 */
Animator.namespace('animations');

Animator.animations = (function($, _) {
    /**
     * Extend function taken from backbone
     * @param  {Object} protoProps  New functionality to add.
     * @param  {Object} staticProps Static properties to add.
     * @return {Object}             New child class-like object.
     */
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    /**
     * Base prototype for our Animations
     */
    function AnimationClass() {
        this.$el = null;
        this.selector = "";
        this.animationData = {};
        this.animations = [];
        this.selector = [];

        this.init.apply(this, arguments);
    }

    _.extend(AnimationClass.prototype, {
        init: function(){},
        tick: function(){},
        applyAnimation: function(){}
    });

    AnimationClass.extend = extend;

    /**
     * The default animation type. Applys various css properties at specified
     * positions based on total percentage of height of document.
     *
     * Used for non-linear animations, use more animation items for
     * smoother animations.
     * 
     * Animation File example
     * ```
     * {
     *     name: "Basic Animation",
     *     type: "sprite",
     *     animations: [{
     *         position: 10,
     *         css: {
     *             top: 20,
     *             left: 40
     *         },
     *     }, {
     *         position: 30,
     *         css: {
     *             top: 500,
     *             left: 400,
     *             opacity: 0.8
     *         }
     *     }, {
     *         position: 60,
     *         css: {
     *             top: 1000,
     *             left: 800,
     *             opacity: 0.5
     *         }
     *     }]
     * }
     * ```
     * 
     * Implementation Example: 
     * ```
     * var autoAnimation = new DefaultAnimation(animationDataObject);
     * ```
     */
    var DefaultAnimation = AnimationClass.extend({
        init: function(animationData) {
            this.animationData = animationData;
            this.animations = animationData.animations;
            this.selector = animationData.selector;
            this.$el = $(animationData.selector);

            Animator.mediator.subscribe('tick', this.tick, this);
        },

        tick: function(tick) {
            var animations = this.animations,
                animation,
                nextAnimation;

            for ( var i in animations ) {
                i = parseInt(i, 10);
                animation = animations[i];

                if ( i == animations.length - 1 ) {
                    nextAnimation = { position: 101 };
                } else {
                    nextAnimation = animations[i + 1];
                }

                if ( tick.percent > animation.position && tick.percent < nextAnimation.position ) {
                   this.applyAnimation(animation.css);
                }
            }
        },

        applyAnimation: function(cssData) {
            this.$el.css(cssData);
        }

    });

    /**
     * An automatically generated animation between two frames. Best
     * used for smoother animations for simpler tasks.
     * 
     * Animation File example
     * ```
     * {
     *     name: "Auto Animation",
     *     type: "auto",
     *     cycle: ['../image/cycle_1.png', '../image/cycle_2.png'],
     *     increment: 50
     *     animations: [{
     *         position: 10,
     *         css: {
     *             top: 20
     *         },
     *     }, {
     *         position: 60,
     *         css: {
     *             top: 1000
     *         }
     *     }]
     * }
     * ```
     * 
     * Implementation Example: 
     * ```
     * var autoAnimation = new AutoAnimation(animationDataObject);
     * ```
     */
    var AutoAnimation = DefaultAnimation.extend({
        init: function(animationData) {
            AutoAnimation.__super__.init.apply(this, [animationData]);
            this.buildAnimation();
        },

        cycle: function() {
            var cc = 0,
                cycle;

            cycle = this.animationData['cycle'] || [];

            return function() {
                var rv = cycle[cc];
                cc = (cc + 1) % cycle.length;
                return rv;
            };
        },

        buildAnimation: function() {
            var animations,
                firstAnimation,
                lastAnimation,
                increment,
                positionDelta,
                cssProperty,
                cssDelta,
                newAnimations = [],
                positionValue = 0,
                cssValue,
                css;

            animations = $.extend(true, [], this.animations);
            firstAnimation = animations[0];
            lastAnimation = animations[this.animations.length - 1];
            increment = this.animationData.increment - 1;
            positionDelta = lastAnimation.position - firstAnimation.position;
            cssProperty = this.animationData.cssProperty || 'left';
            cssDelta = lastAnimation.css[cssProperty] - firstAnimation.css[cssProperty];
            newAnimations = [];
            positionValue = 0;
            cssValue = firstAnimation.css[cssProperty];

            if( this.animationData.cycle !== undefined ) { this.cycle(); }

            for( var i = 0; i <= increment; i++ ) {
                css = {};
                cssValue = cssValue + ( cssDelta / increment );
                css[cssProperty] = cssValue;

                /**
                 * Deal with cycling through our cycle array.
                 */
                if ( this.animationData.cycle !== undefined ) {
                    css['background-image'] = 'url(' + this.cycle() + ')';
                }

                newAnimations.push({
                    position: i * ( positionDelta / increment) + firstAnimation.position,
                    css: css
                });
            }

            this.animations = newAnimations;
        }
    });

    var TextboxAnimation = DefaultAnimation.extend({
        init: function(animationData) {
            AutoAnimation.__super__.init.apply(this, [animationData]);
            this.buildAnimation();
        },

        buildAnimation: function() {
            var animations,
                animation,
                newAnimations = [];
            animations = $.extend(true, [], this.animations);
            for (var i = 0; i < animations.length; i++) {
                animation = animations[i];
                for ( var z = animation.position - 3; z < animation.position; z++ ) {
                }
            }
        }
    });

    return {
        DefaultAnimation: DefaultAnimation,
        AutoAnimation: AutoAnimation
    };
}(jQuery, _));