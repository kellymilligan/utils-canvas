define( function () {

    'use strict';

    /*

        Draw a circle on the provided canvas 2d context.
        By default a full, closed-path circle is drawn.

        ctx           context2D   Canvas context to draw to
        x             num         X position at centre of circle
        y             num         Y position at centre of circle
        r             num         Radius of circle

        c             bool        optional - Close path flag
        sA            num         optional - Start angle (in Radians)
        eA            num         optional - End angle (in Radians)
        aC            bool        optional - Anti-clockwise flag
        inDegrees     bool        optional - Flag whether angle is passed in as degrees

    */

    return function (ctx, x, y, r, c, sA, eA, aC, inDegrees) {

        // Apply defaults for omitted optional parameters
        c = c || true;
        sA = sA || 0;
        eA = eA || Math.PI * 2;
        aC = aC || false;

        // Convert to radians if flagged as degrees
        sA = inDegrees === true ? sA * ( Math.PI / 180 ) : sA;
        eA = inDegrees === true ? eA * ( Math.PI / 180 ) : eA;

        // Draw circle
        ctx.beginPath();
        ctx.arc( x, y, r, sA, eA, aC );
        if ( c ) { ctx.closePath(); }

    };

});
