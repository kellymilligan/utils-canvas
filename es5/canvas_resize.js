define( function () {

    'use strict';

    /*

        Resize the canvas of the supplied context

        ctx      context2D     Canvas context to resize
        w        num           new width of the canvas
        h        num           new height of the canvas

    */

    return function (ctx, w, h) {

        var pixelRatio = Math.max( ( window.devicePixelRatio ) ? window.devicePixelRatio : 1, 1 );

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        ctx.canvas.style.width = w + 'px';
        ctx.canvas.style.height = h + 'px';

        if ( useDpi ) {

            if ( dpiMax ) {

                pixelRatio = Math.min( pixelRatio, dpiMax );
            }

            ctx.canvas.width = w * pixelRatio;
            ctx.canvas.height = h * pixelRatio;

            ctx.scale( pixelRatio, pixelRatio );
        }
    };

});