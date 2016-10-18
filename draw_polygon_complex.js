import pointOnCircle from '../math/point/point_on_circle';
import pointLerp2d from '../math/point/point_lerp_2d';

/*

    Draw a symmetrical 2D polygon on the provided canvas 2d context.
    ---
    By default draw a full, closed path polygon with it's first point at 'north'.
    A starting angle and length can be provided to draw an open-ended polygon.

    ctx           context2D   Canvas context to draw to
    x             num         X position at centre of polygon
    y             num         Y position at centre of polygon
    r             num         Radius of polygon
    n             num         Number of points that form the polygon, minimum of 3

    aS            deg/rad     optional - Angle at which polygon starts drawing
    aL            deg/rad     optional - Length of polygon from starting angle
    aO            deg/rad     optional - Angle offset to rotate the polygon by
    cc            bool        optional - Flag whether to draw counter-clockwise
    closePath     bool        optional - Flag whether to close the path internally
    inDegrees     bool        optional - Flag whether angles are passed in as degrees

*/

export default function (

    ctx, x, y, r, n,

    aS = 0,             // Zero as default starting angle
    aL = Math.PI * 2,   // Full rotation as default length
    aO = 0,             // Zero as default angle offset
    cc = false,         // Clockwise as the default direction
    closePath = true,   // Closed path as the default
    inDegrees = false

) {

    const TWO_PI = Math.PI * 2;
    const FP_SENSITIVITY = 0.0001; // Floating point adjustment value

    var points = [];

    // Validate number of points
    n = n >= 3 ? n : 3;

    // Convert to radians if flagged as degrees
    if ( inDegrees === true ) { aS = aS * ( Math.PI / 180 ); aL = aL * ( Math.PI / 180 ); aO = aO * ( Math.PI / 180 ); }

    // Normalise starting angle to nominal angle, buffer against floating point artefacts
    aS = Math.max( ( aS - FP_SENSITIVITY ) % TWO_PI, 0 );
    // Restrict length to one full rotation, buffer against floating point artefacts
    aL = aL < FP_SENSITIVITY ? 0 : Math.min( aL, TWO_PI );

    // Find points on circle
    for ( let i = 0; i < n; i++ ) {

        // Start at -90 degrees to align first point to 'north'
        let a = ( Math.PI * -0.5 ) + aO + ( TWO_PI / n ) * i;
        let point = pointOnCircle( x, y, r, a );

        point.a = a + Math.PI * 0.5;

        points.push( point );
    }

    // Flip canvas if drawing counter clockwise
    if ( cc ) {

        ctx.translate( x * 2, 0 );
        ctx.scale( -1, 1 );
    }

    ctx.beginPath();

    // Draw a full polygon
    if ( aL >= TWO_PI * ( 1 - FP_SENSITIVITY ) ) {

        ctx.moveTo( points[0].x, points[0].y );

        for ( let i = 1, l = points.length; i < l; i++ ) {

            ctx.lineTo( points[ i ].x, points[ i ].y );
        }

        ctx.closePath();
    }
    // Draw a partial polygon (if length is more than zero)
    else if ( aL > 0 ) {

        let startIndex = parseInt( aS / ( TWO_PI / n ), 10 );
        let startPoint = points[ startIndex ];
        let startProgress = ( aS % ( TWO_PI / n ) ) / ( TWO_PI / n );
        let startNextPoint = points[ ( startIndex + 1 ) % n ];
        let startLerpPoint = lerpPoint2d( startPoint, startNextPoint, startProgress );

        let endIndex = parseInt( ( aS + aL ) / ( TWO_PI / n ), 10 ) % n;
        let endPoint = points[ endIndex ];
        let endProgress = ( ( aS + aL ) % ( TWO_PI / n ) ) / ( TWO_PI / n );

        let fullSteps = parseInt( aL / ( TWO_PI / n ), 10 );

        // Begin at the starting angle
        ctx.moveTo( startLerpPoint.x, startLerpPoint.y );

        // Draw steps
        for ( let i = 1; i <= fullSteps; i++ ) {

            let nextIndex, nextPoint;

            nextIndex = ( startIndex + i ) % n;
            nextPoint = points[ nextIndex ];

            ctx.lineTo( nextPoint.x, nextPoint.y );
        }

        // Draw to end point if at least 1 full step or passing through a point
        if ( fullSteps > 0 || startIndex !== endIndex ) { ctx.lineTo( endPoint.x, endPoint.y ); }

        // Draw tail
        let tailIndex = ( endIndex + 1 ) % n;
        let tailPoint = points[ tailIndex ];
        let tailLerpPoint = lerpPoint2d( endPoint, tailPoint, endProgress );

        ctx.lineTo( tailLerpPoint.x, tailLerpPoint.y );

        if ( closePath ) { ctx.closePath(); }

    }

}
