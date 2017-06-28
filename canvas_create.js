/*
    Create a canvas element and set it's initial size

    w           Number        width of the canvas
    h           Number        height of the canvas

    use_dpi     Boolean       optional - whether to scale to device DPI
    dpi_max     num           optional - maximium DPI to scale up to (default to 2x)

    --
    Returns     context2D     canvas' 2D context

*/

export default function (

    w, h,

    use_dpi = false,
    dpi_max = 2

) {

    if ( w === undefined || h === undefined ) { console.warn( 'canvas_create.js: Canvas width or height was not defined.' ); }

    let canvas = document.createElement( 'canvas' );
    let ctx = canvas.getContext( '2d' );

    let pixel_ratio = Math.max( window.devicePixelRatio ? window.devicePixelRatio : 1, 1 );

    canvas.width = w;
    canvas.height = h;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    if ( use_dpi ) {

        pixel_ratio = Math.min( pixel_ratio, dpi_max );

        canvas.width = w * pixel_ratio;
        canvas.height = h * pixel_ratio;

        ctx.scale( pixel_ratio, pixel_ratio );
    }

    return ctx;
}