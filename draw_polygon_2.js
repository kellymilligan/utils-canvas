define([

    '../math/point_on_circle',
    '../math/lerp_point_2d'

], function (

    pointOnCircle,
    lerpPoint2d

) {

    'use strict';

    /*

        ** DRAFT **
        - To add ability to animate counter-clockwise
        - Can't animate very short length's without the indexes doing odd things
        - General tidy up

        Draw a symmetrical polygon on the provided canvas 2d context.
        By default, draws a full, closed path polygon.
        Starting angle and length can be passed to draw an open-ended polygon path.

        ctx           context2D   Canvas context to draw to
        x             num         X position at centre of circle
        y             num         Y position at centre of circle
        r             num         Radius of circle
        n             num         Number of points that form the polygon, minimum of 3

        aS            deg/rad     optional - Angle at which polygon starts drawing
        aL            deg/rad     optional - Length of polygon from starting angle
        aO            deg/rad     optional - Offset angle at which to drawing the polygon
        inDegrees     bool        optional - Flag whether angles are passed in as degrees
        closePath     bool        optional - Flag whether to close the path internally

    */

    return function (ctx, x, y, r, n, aS, aL, aO, inDegrees, closePath) {

        var points = [];
        var point, a, j, l, sX, sY;
        var TWO_PI = Math.PI * 2;
        var FLOATING_POINT_CUTOFF = 0.99;

        // Validate and set defaults
        n = n >= 3 ? n : 3;                                     // Restrict point count to a minimum of 3
        aS = aS || 0;                                           // Set zero as default starting angle
        aL = aL || Math.PI * 2;                                 // Set full rotation as default length
        aO = aO || 0;                                           // Set zero as default angle offset
        closePath = closePath === undefined ? true : closePath; // Set closed path as the default

        // Convert to radians if flagged as degrees
        if ( inDegrees === true ) { aS = aS * ( Math.PI / 180 ); aL = aL * ( Math.PI / 180 ); aO = aO * ( Math.PI / 180 ); }

        // Normalise values to 1 rotation, buffer against floating point artefacts
        aS = Math.max( ( aS - 0.0000001 ) % TWO_PI, 0 );
        aL = aL === TWO_PI ? aL : aL % TWO_PI;

        // Find points on circle
        for ( var i = 0; i < n; i++ ) {

            // Start at -90 degrees to align first point to top
            a = ( Math.PI * -0.5 ) + aO + ( TWO_PI / n ) * i;

            point = pointOnCircle( x, y, r, a );
            point.a = a + Math.PI * 0.5;
            points.push( point );
        }

        // Draw a full polygon
        if ( aL >= TWO_PI ) {

            ctx.beginPath();

            ctx.moveTo( points[0].x, points[0].y );

            for ( j = 1, l = points.length; j < l; j++ ) {

                ctx.lineTo( points[ j ].x, points[ j ].y );
            }

            ctx.closePath();
        }
        // Draw a partial polygon
        else {

            ctx.beginPath();

            var startIndex = Math.min( parseInt( aS / ( TWO_PI / n ), 10 ), n - 1 ); // Clamp to avoid floating point errors
            var startPoint = points[ startIndex ];
            var startProgress = ( aS % ( TWO_PI / n ) ) / ( TWO_PI / n );
            var startNextPoint = points[ ( startIndex + 1 ) % n ];
            var startLerpPoint = lerpPoint2d( startPoint, startNextPoint, startProgress );

            var endIndex = parseInt( ( aS + aL ) / ( TWO_PI / n ), 10 ) % n;
            var endPoint = points[ endIndex ];
            var endProgress = ( ( aS + aL ) % ( TWO_PI / n ) ) / ( TWO_PI / n );

            var fullSteps = parseInt( aL / ( TWO_PI / n ), 10 );

            // Begin at the starting angle
            ctx.moveTo( startLerpPoint.x, startLerpPoint.y );

            var nextIndex, nextPoint;

            // Draw steps
            for ( j = 1; j <= fullSteps; j++ ) {

                nextIndex = ( startIndex + j ) % n;
                nextPoint = points[ nextIndex ];

                ctx.lineTo( nextPoint.x, nextPoint.y );
            }

            // Draw to end point
            ctx.lineTo( endPoint.x, endPoint.y );

            // Draw tail
            var tailIndex = ( endIndex + 1 ) % n;
            var tailPoint = points[ tailIndex ];
            var tailLerpPoint = lerpPoint2d( endPoint, tailPoint, endProgress );

            // console.log(endPoint, endProgress);

            ctx.lineTo( tailLerpPoint.x, tailLerpPoint.y );

            if ( closePath ) { ctx.closePath(); }

        }

    };

});
