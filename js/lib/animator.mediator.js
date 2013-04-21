/**
 * Mediator
 *
 * Mediator pattern used to trigger animations from tick actions on
 * a timing engine. Also responsible for general communication
 * between modules in this app.
 */
Animator.mediator = (function($, _) {
    // Storage for topics that can be broadcast or listened to
    var topics = {};

    /**
     * Add a listener for a topic.
     * @param  {String}   topic   A name for a topic to be published and listened for.
     * @param  {Function} fn      The callback to fire when the topic is published.
     * @param  {[type]}   context Context to apply to the callback.
     * @return {Object}           Return the mediator object.
     */
    var subscribe = function( topic, fn, context){

        if ( !topics[topic] ) {
          topics[topic] = [];
        }

        if ( typeof context === 'undefined' ) {
            context = this;
        }

        topics[topic].push( { context: context, callback: fn } );

        return this;
    };

    /**
     * Trigger the subscriptions
     * @param  {String} topic Name of topic to trigger its subscribers.
     * @return {Object}       The mediator object
     */
    var publish = function( topic ){

        var args;

        if ( !topics[topic] ){
          return false;
        }

        args = Array.prototype.slice.call( arguments, 1 );
        for ( var i = 0, l = topics[topic].length; i < l; i++ ) {

            var subscription = topics[topic][i];
            subscription.callback.apply( subscription.context, args );
        }
        return this;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function( obj ){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})(jQuery, _);