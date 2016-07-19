define( function () {

    'use strict';

    /*

        Draw a rounded rectangle on the provided canvas 2d context.
        Radius can be supplied as a single value for all 4 corners,
        or as separate values for each corner.

        Radius values for each corner are CSS border-radius style:
        Top Left -> Top Right -> Bottom Right -> Bottom left

        Adapted from http://stackoverflow.com/a/3368118

        ctx   context2D   Canvas context to draw to
        x     num         X position to start draw
        y     num         Y position to start draw
        w     num         Width of the rectangle
        h     num         Height of the rectangle
        r     num         Radius of all 4 corners, or the top left corner if others are provided

        tr    num         Optional - Radius of the top right corner
        br    num         Optional - Radius of the bottom right corner
        bl    num         Optional - Radius of the bottom left corner

    */

    return function (ctx, x, y, w, h, r, tr, br, bl) {

        r = r || 4; // default

        var radius;

        // If supplied as separate radius values, contstruct from these
        if ( tr !== undefined && br !== undefined && bl !== undefined ) {

            radius = { tl: r, tr: tr, br: br, bl: bl };
        }
        // Otherwise use a uniform radius on all corners
        else {

            radius = { tl: r, tr: r, br: r, bl: r };
        }

        ctx.beginPath();

        ctx.moveTo( x + radius.tl, y );
        ctx.lineTo( x + w - radius.tr, y );
        ctx.quadraticCurveTo( x + w, y, x + w, y + radius.tr );
        ctx.lineTo( x + w, y + h - radius.br );
        ctx.quadraticCurveTo( x + w, y + h, x + w - radius.br, y + h );
        ctx.lineTo( x + radius.bl, y + h );
        ctx.quadraticCurveTo( x, y + h, x, y + h - radius.bl );
        ctx.lineTo( x, y + radius.tl );
        ctx.quadraticCurveTo( x, y, x + radius.tl, y );

        ctx.closePath();

    };

});
