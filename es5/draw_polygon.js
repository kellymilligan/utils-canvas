define([

    '../utils-math/point/point_on_circle'

], function (

    pointOnCircle

) {

    'use strict';

    /*

        Draw a symmetrical polygon on the provided canvas 2d context.

        ctx           context2D   Canvas context to draw to
        x             num         X position at centre of circle
        y             num         Y position at centre of circle
        r             num         Radius of circle
        n             num         Number of points that form the polygon, minimum of 3

        aOffset       deg/rad     optional - Angle of rotation on the polygon
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
        var point, a;

        // Find points on circle
        for ( var i = 0; i < n; i++ ) {

            // Start at -90 degrees to align first point to top
            a = ( Math.PI * -0.5 ) + aOffset + ( ( 2 * Math.PI ) / n ) * i;

            point = pointOnCircle( x, y, r, a );

            points.push( point.x );
            points.push( point.y );
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
