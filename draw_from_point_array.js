/*
    Draw a shape from an array of points on the provided canvas 2d context.
    Points in the array must be objects with 'x' and 'y' properties.

    ctx         context2D      Canvas context to draw to
    points      Array          Array of point coordinate pairs to construct from
    x           Number         origin X position of shape's coordinate space
    y           Number         origin Y position of shape's coordinate space

    close       Boolean        optional - Flag whether to close the path

*/

export default function (

    ctx, points,
    x = 0,
    y = 0,

    close = false

) {

    ctx.save();
    ctx.translate( x, y );
    ctx.beginPath();

    for ( let i = 0, length = p.length; i < length; i++ ) {

        let p = points[ i ];

        i === 0 ? ctx.moveTo( p.x, p.y ) : ctx.lineTo( p.x, p.y );
    }

    if ( close ) { ctx.closePath(); }
    ctx.restore();

}