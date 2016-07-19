define( function () {

    'use strict';

    /*

        Draw a rectangle with symmetrical half circles it's ends on the
        provided canvas 2d context. Uses the canvas 2d arc() method.

        ctx   context2D   Canvas context to draw to
        x     num         X position to start draw
        y     num         Y position to start draw
        w     num         Width of the rectangle
        h     num         Height of the rectangle

    */

    return function (ctx, x, y, w, h) {

        ctx.beginPath();

        var radius = h * 0.5;

        ctx.moveTo( x + radius, y );

        // Top line
        ctx.lineTo( x + radius + ( w - radius * 2 ), y );

        // Right cap
        ctx.arc(
            x + radius + ( w - radius * 2 ),
            y + radius,
            radius,
            Math.PI * 1.5,
            Math.PI * 0.5
        );

        // Bottom line
        ctx.lineTo( x + radius, y + h );

        // Left cap
        ctx.arc(
            x + radius,
            y + radius,
            radius,
            Math.PI * -1.5,
            Math.PI * -0.5
        );

        ctx.closePath();

    };

});
