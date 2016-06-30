define( function () {

    'use strict';

    /*
        Draw a circle on the provided canvas 2d context.
        By default a full, closed-path circle is drawn.

        ctx   context2D   Canvas context to draw to
        x     int         X position at *CENTER* of circle
        y     int         Y position at *CENTER* of circle
        r     int         Radius of circle
        
        c     bool        optional - Close path flag
        sA    rads        optional - Start angle
        eA    rads        optional - End angle
        aC    bool        optional - Anti-clockwise flag

    */

    return function (ctx, x, y, r, c, sA, eA, aC) {

        // Apply defaults for omitted optional parameters
        c = c || true;
        sA = sA || 0;
        eA = eA || Math.PI * 2;
        aC = aC || false;

        // Draw circle
        ctx.beginPath();
        ctx.arc( x, y, r, sA, eA, aC );
        if ( c ) { ctx.closePath(); }

    };

});
