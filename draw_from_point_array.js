/*
    Draw a shape from an array of points on the provided canvas 2d context.
    Points must be objects with an 'x' and 'y' parameter.

    ctx   context2D   Canvas context to draw to
    x     num         origin X position of shape's coordinate space
    y     num         origin Y position of shape's coordinate space
    p     arr         Array of point objects to draw

    c     bool        optional - Close path flag

*/

export default function (

    ctx, x, y, p,

    c = false

) {

    // Draw circle
    ctx.save();
    ctx.translate( x, y );
    ctx.beginPath();

    for ( let i = 0, length = p.length; i < length; i++ ) {

        let point = p[ i ];

        if ( i === 0 ) {

            ctx.moveTo( point.x, point.y );
        }
        else {

            ctx.lineTo( point.x, point.y );
        }
    }

    if ( c ) { ctx.closePath(); }
    ctx.restore();

}