/*
    Resize the provided context's canvas

    ctx         Context2D     context of canvas to resize
    w           Number        width of the canvas
    h           Number        height of the canvas

    use_dpi     Boolean       optional - whether to scale to device DPI
    dpi_max     num           optional - maximium DPI to scale up to (default to 2x)

*/

export default function (

    ctx, w, h,

    use_dpi = false,
    dpi_max = 2

) {

    if ( w === undefined || h === undefined ) { console.warn( 'canvas_resize.js: Canvas width or height was not defined.' ); }

    let pixel_ratio = Math.max( window.devicePixelRatio ? window.devicePixelRatio : 1, 1 );

    ctx.canvas.width = w;
    ctx.canvas.height = h;

    ctx.canvas.style.width = w + 'px';
    ctx.canvas.style.height = h + 'px';

    if ( use_dpi ) {

        pixel_ratio = Math.min( pixel_ratio, dpi_max );

        ctx.canvas.width = w * pixel_ratio;
        ctx.canvas.height = h * pixel_ratio;

        ctx.scale( pixel_ratio, pixel_ratio );
    }
}