define( function () {

    'use strict';

    /*
        Draw a cross on the provided canvas 2d context.
        By default a full, closed-path circle is drawn.

        ctx           context2D   Canvas context to draw to
        x             num         X position at *CENTER* of cross
        y             num         Y position at *CENTER* of cross
        r             num         Radius of cross arms

        aOffset       deg/rad     optional - Angle of rotation on the cross
        inDegrees     bool        optional - Flag whether aOffset is passed in as degrees

    */

    return function (ctx, x, y, r, aOffset, inDegrees) {

        // Set zero as default angle offset
        aOffset = aOffset || 0;

        // Convert to radians if flagged as degrees
        if ( inDegrees === true ) { aOffset = ( Math.PI / 180 ) * aOffset; }

        ctx.save();

        ctx.translate( x, y );
        ctx.rotate( aOffset );

        ctx.beginPath();

        // Left arm
        ctx.moveTo( -r, -r );
        ctx.lineTo( r, r );

        // Right arm
        ctx.moveTo( r, -r );
        ctx.lineTo( -r, r );

        ctx.closePath();
        ctx.restore();

    };

});
