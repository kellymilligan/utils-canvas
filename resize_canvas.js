define( function () {

    'use strict';

    /*

        Resize a canvas previously created using the create_canvas.js util

        ctx      context2D     Canvas context to resize
        w        num           new width of the canvas
        h        num           new height of the canvas

    */

    return function (ctx, w, h) {

        var pixelRatio = ( window.devicePixelRatio ) ? window.devicePixelRatio : 1;

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        ctx.canvas.style.width = w + 'px';
        ctx.canvas.style.height = h + 'px';

        if ( ctx._useDpi ) {

            if ( ctx._dpiMax ) {

                pixelRatio = Math.min( pixelRatio, ctx._dpiMax );
            }

            ctx.canvas.width = w * pixelRatio;
            ctx.canvas.height = h * pixelRatio;

            ctx.scale( pixelRatio, pixelRatio );
        }
    };

});