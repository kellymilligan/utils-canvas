define( function () {

    'use strict';

    /*

        Draw a symmetrical polygon on the provided canvas 2d context.

        ctx           context2D   Canvas context to draw to
        x             num         X position at centre of circle
        y             num         Y position at centre of circle
        r             num         Radius of circle
        p             num         Number of points that form the polygon, minimum of 3

        aOffset       deg/rad     optional - Angle offset of polygon (i.e. where the first point starts)
        inDegrees     bool        optional - Flag whether aOffset is passed in as degrees

    */

    return function (ctx, x, y, r, n, aOffset, inDegrees) {

        // Restrict point count to a minimum of 3
        n = n >= 3 ? n : 3;

        // Set zero as default angle offset
        aOffset = aOffset || 0;

        // Convert to radians if flagged as degrees
        if ( inDegrees === true ) { aOffset = ( Math.PI / 180 ) * aOffset; }

        var points = [];
        var pX, pY, a;

        // Find points on circle
        // Note: could use point_on_circle math util as a dependency to abstract this out.
        for ( var i = 0; i < n; i++ ) {

            a = aOffset + ( ( 2 * Math.PI ) / n ) * i;

            pX = x + r * Math.cos( a );
            pY = y + r * Math.sin( a );

            points.push( pX );
            points.push( pY );
        }

        // Draw polygon
        ctx.beginPath();
        ctx.moveTo( points[0], points[1] );

        for ( var j = 2, l = points.length; j < l - 1; j += 2 ) {

            ctx.lineTo( points[ j ], points[ j + 1 ] );
        }

        ctx.closePath();
    };

});
