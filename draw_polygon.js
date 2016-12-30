/*

    Draw a symmetrical polygon on the provided canvas 2d context.

    ctx           context2D   Canvas context to draw to
    x             num         X position at centre of circle
    y             num         Y position at centre of circle
    r             num         Radius of circle
    n             num         Number of points that form the polygon, minimum of 3

    aO            deg/rad     optional - Angle of rotation on the polygon
    inDegrees     bool        optional - Flag whether aO is passed in as degrees

*/

import pointOnCircle from '../math/point/point_on_circle';

export default function (

    ctx, x, y, r, n,

    aO = 0,
    inDegrees = false

) {

    // Restrict point count to a minimum of 3
    n = n >= 3 ? n : 3;

    // Set zero as default angle offset
    aO = aO || 0;

    // Convert to radians if flagged as degrees
    if ( inDegrees === true ) { aO = ( Math.PI / 180 ) * aO; }

    var points = [];
    var point, a;

    // Find points on circle
    for ( var i = 0; i < n; i++ ) {

        // Start at -90 degrees to align first point to top
        a = ( Math.PI * -0.5 ) + aO + ( ( 2 * Math.PI ) / n ) * i;

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

}
