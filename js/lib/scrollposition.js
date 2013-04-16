$(document).ready(function(){
    $('body').append('<div class="debug databox">Some information!</div>');
    var $databox = $('.debug.databox');
    var styles = $databox.get(0).style;
    styles.opacity = 0.6;
    styles.backgroundColor = '#000000';
    styles.position = "fixed";
    styles.right = 0;
    styles.zIndex = 100;
    styles.top = 0;
    styles.padding = '10px 20px';
    styles.borderRadius = '5px';
    styles.color = '#ffffff';
    styles.fontSize = '16px';
    styles.fontFamily = 'Arial';

    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var height = $('body').height() - $(window).outerHeight();
        var percent = ( scrollTop / height ) * 100;

        debugLine({
            'scrollTop': scrollTop,
            'Height': height,
            'Percent': percent
        });

        // styles.top =  $(window).height() * ( percent / 100) + 'px';
    });

    function debugLine(data) {
        var html = '';
        for( var i in data) {
            html += i + ': ' + data[i] + ' ';
        }
        $databox.html(html);
    }
});