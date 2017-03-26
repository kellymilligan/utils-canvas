/*
    Draw a cross on the provided canvas 2d context.

    ---

    ctx           context2D   Canvas context to draw to
    x             num         X position at centre of cross
    y             num         Y position at centre of cross
    r             num         Radius of cross

    a             num         optional - Angle of rotation on the cross
    inDegrees     bool        optional - Flag whether angle is passed in as degrees

*/

export default function (

    ctx, x, y, r,

    a = 0,
    inDegrees = false

) {

    // Convert to radians if flagged as degrees
    if ( inDegrees === true ) { a *= ( Math.PI / 180 ); }

    ctx.save();

    ctx.translate( x, y );
    ctx.rotate( a );

    ctx.beginPath();

    // Left arm
    ctx.moveTo( -r, -r );
    ctx.lineTo( r, r );

    // Right arm
    ctx.moveTo( r, -r );
    ctx.lineTo( -r, r );

    ctx.closePath();
    ctx.restore();

}