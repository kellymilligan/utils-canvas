define( function () {

    'use strict';

    /*

        Create a canvas element and set it's initial size.

        w           num           width of the canvas
        h           num           height of the canvas

        useDpi      bool          optional - whether to scale to device DPI (default true)
        dpiMax      num           optional - maximium DPI to scale to

        --
        Returns     context2D     canvas' 2D context

    */

    return function (w, h, useDpi, dpiMax) {

        useDpi = useDpi || true; // By default scale to DPI

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var pixelRatio = Math.max( ( window.devicePixelRatio ) ? window.devicePixelRatio : 1, 1 );

        canvas.width = w;
        canvas.height = h;

        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        if ( useDpi ) {

            if ( dpiMax ) {

                pixelRatio = Math.min( pixelRatio, dpiMax );
            }

            canvas.width = w * pixelRatio;
            canvas.height = h * pixelRatio;

            ctx.scale( pixelRatio, pixelRatio );
        }

        return ctx;
    };

});