/*

    Draw 1 face of a symmetrical tetrahedron on the provided canvas 2d context.
    Useful for drawing the 2 faces of a tetrahedron/pyramid but in 2d. Call the
    method twice, passing in true for the offFace parameter on the second call.

    ctx         context2D   Canvas context to draw to
    x           num         X position at centre of circle
    y           num         Y position at centre of circle
    r           num         Radius of circle
    p           num (0-1)   Perspective of prism sides (normalised)
    offFace     bool        Flag whether to flip horizontally to draw the off face

*/

import pointOnCircle from '../math/point/point_on_circle';

export default function (

    ctx, x, y, r,

    p = 0.25,
    offFace = false

) {

    var points = [];
    var point, a;

    ctx.save();
    {

        if ( offFace ) {

            ctx.scale( -1, 1 );
            x = x * -1;
        }

        // Top point
        point = pointOnCircle( x, y, r, Math.PI * -0.5 );
        points.push( point.x, point.y );

        // Bottom point
        point = pointOnCircle( x, y, r, Math.PI * 0.5 );
        points.push( point.x, point.y );

        // Side point
        point = pointOnCircle( x, y + r, r, Math.PI * p * -0.5 );
        points.push( point.x, point.y );

        // Draw polygon
        ctx.beginPath();
        ctx.moveTo( points[0], points[1] );

        for ( var j = 2, l = points.length; j < l - 1; j += 2 ) {

            ctx.lineTo( points[ j ], points[ j + 1 ] );
        }

        ctx.closePath();
    }
    ctx.restore();

}
