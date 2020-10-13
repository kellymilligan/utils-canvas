/*
    Draw a rounded rectangle on the provided canvas 2d context.
    Radius can be supplied as a single value (applied to all corners)
    or as separate values for each corner.

    Radius values for each corner are CSS border-radius style:
    Top Left -> Top Right -> Bottom Right -> Bottom left

    Adapted from http://stackoverflow.com/a/3368118

    ctx                 context2D   Canvas context to draw to
    x                   num         X position of top-left corner
    y                   num         Y position of top-left corner
    width               num         Width of the rectangle
    height              num         Height of the rectangle
    radius              num         Uniform radius or radius of the top-left corner

    topRightRadius      num         Optional - Radius of the top-right corner
    bottomRightRadius   num         Optional - Radius of the bottom-right corner
    bottomLeftRadius    num         Optional - Radius of the bottom-left corner
*/

export default function (
    ctx,
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    radius = 10,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius
) {
    const radii = {
        tl: radius,
        tr: topRightRadius !== undefined ? topRightRadius : radius,
        br: bottomRightRadius !== undefined ? bottomRightRadius : radius,
        bl: bottomLeftRadius !== undefined ? bottomLeftRadius : radius
    };

    ctx.beginPath();

    ctx.moveTo( x + radii.tl, y );
    ctx.lineTo( x + width - radii.tr, y );
    ctx.quadraticCurveTo( x + width, y, x + width, y + radii.tr );
    ctx.lineTo( x + width, y + height - radii.br );
    ctx.quadraticCurveTo( x + width, y + height, x + width - radii.br, y + height );
    ctx.lineTo( x + radii.bl, y + height );
    ctx.quadraticCurveTo( x, y + height, x, y + height - radii.bl );
    ctx.lineTo( x, y + radii.tl );
    ctx.quadraticCurveTo( x, y, x + radii.tl, y );

    ctx.closePath();
};