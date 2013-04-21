/**
 * Main app logic
 *
 * Scroll Engine takes an array of animations which 
 * reside in js/animations/<name>.js.
 *
 * Second parameter are available options, which in this
 * version there are few.
 */
new Animator.animation.ScrollEngine([
    'animation',
    'autoanimation'
], { direction: 'vertical' } );
Animator.debug.scrollPosition.init();