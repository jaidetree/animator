(function () {
    var Animation = 
    var Animator = function (animations) {
        /**
         * Private Variables
         */
        var self = this;

        /**
         * Public Variables/Objects
         */
        self.listeners = [];

        /**
         * Public Methods
         */
        self.addAnimation = function (animation) {
            animation = extend(DefaultAnimation, animation);
            animation = new self.Animations[capitalize(animation.type)]();
            this.events[animation.on].push(animation);
        };

        self.animate = function (eventDetails) {
            var animator = {}, 
                item = null;
            /**
             * Loop through our available animators listening
             * to this event type and animate from them.
             */
            for (item in this.events[eventDetails.event]) {
                animator = this.events[eventDetails.event];
                animator.animate(eventDetails.data);
            }
        };

        /**
         * Private Methods
         */
        function capitalize (string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function extend (obj) {
            each(slice.call(arguments, 1), function (source) {
                if (source) {
                    for (var prop in source) {
                        obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        }
    };

})();
