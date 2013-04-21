/**
 * Debug Scroll Position
 *
 * A system to display information about the current percentage of
 * scrolling to know exactly what properties should be set within
 * a timeline.
 */
Animator.namespace('debug.scrollPosition');
Animator.debug.scrollPosition = (function ($, _) {
    var databox,
        propertyToUpdate = "top";

    /**
     * Draw the display element
     * Subscribe to the tick topic to update stats
     * Subscribe to animationloaded to setup orientation
     */
    function init() {
        render();
        Animator.mediator.subscribe('tick', update);
        Animator.mediator.subscribe('animationsLoaded', animationLoaded);
    }

    /**
     * Subscribed to animationLoaded from the AnimationController
     * @param  {AnimationController} controller AnimationController instance to use
     */
    function animationLoaded(controller) {
        if ( controller.timingEngine.options.direction === 'horizontal' ) {
            databox.style.right = 'auto';
            databox.style.top = 'auto';
            databox.style.bottom = 0;
            databox.style.left = 0;
            propertyToUpdate = "left";

        } else {
            databox.style.right = 0;
            databox.style.top = 0;
            databox.style.bottom = 'auto';
            databox.style.left = 'auto';
            propertyToUpdate = "top";
        }
    }

    /**
     * Create the DOM for the display info
     */
    function render() {
        databox = document.createElement('div');
        databox.setAttribute('class', 'debug databox');
        databox.appendChild(document.createTextNode('Some information'));
        var styles = databox.style;
        styles.opacity = 0.6;
        styles.backgroundColor = '#000000';
        styles.position = "fixed";
        styles.bottom = '20px';
        styles.zIndex = 100;
        styles.padding = '10px 20px';
        styles.borderRadius = '5px';
        styles.color = '#ffffff';
        styles.fontSize = '16px';
        styles.fontFamily = 'Arial';

        document.body.appendChild(databox);
    }

    /**
     * Update the display info from a TimingEngine tick.
     * var data = {
     *    percent: 20%, // Position percentage,
     *    total: 1000, // Total size of area minus the size of the window
     *    position: 200, // Scroll position
     *    windowSize: 1024, // Size of window
     *    documentSize: 2000, // Total size of content in document
     * };
     */
    function update(data) {
        $('.databox').css( propertyToUpdate, ( (data.windowSize - 18) * data.position / data.documentSize ) + 'px');
        output({
            'Position': data.position,
            'Total': data.total,
            'Percent': Math.round(data.percent) + '%'
        });
    }

    /**
     * Change the contents of the display databox.
     * @param  {Object} data Labels and values to display
     */
    function output(data) {
        var html = '';
        for( var i in data) {
            html += i + ': ' + data[i] + ' ';
        }
        $(databox).html(html);
    }

    return {
        init: init,
        animationLoaded: animationLoaded,
        output: output,
        databox: databox
    };

})(jQuery, _);