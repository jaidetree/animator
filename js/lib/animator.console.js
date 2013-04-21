/**
 * Console Wrapper
 *
 * Allows use of Animator.console.log(); without worrying 
 * about unsupported browsers.
 */
Animator.namespace('console');
Animator.console = (function ($, _) {
    var messages = [],
        log;

    if (typeof console == "undefined") {
        log = function(message) {
            messages.push(message);
        };
    }
    else
    {
        log = function(message) {
            console.log(message);
        };
    }

    return {
        log: log
    };
})(jQuery, _);