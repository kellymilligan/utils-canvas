define( [

    'util/math/point_on_circle',
    'util/math/abs_max'

], function (

    pointOnCircle,
    absMax

) {

    'use strict';

    /*
        Draw a circle on the provided canvas 2d context.
        This method uses a series of points to construct the circle
        rather than using the canvas arc() method. This way the points
        can be manipulated to make an asymmertric circle.
        By default a full, closed-path circle is drawn.

        ctx           context2D   Canvas context to draw to
        x             num         X position at *CENTER* of circle
        y             num         Y position at *CENTER* of circle
        r             num         Radius of circle
        n             num         Number of control points that form the circle, more points make for a smoother circle

        c             bool        optional - Close path flag
        sA            rads        optional - Start angle
        eA            rads        optional - End angle
        aC            bool        optional - Anti-clockwise flag
        inDegrees     bool        optional - Flag whether angle is passed in as degrees

    */

    return function (ctx, x, y, r, n, c, sA, eA, aC) {

        var TWO_PI = Math.PI * 2;

        // Validate control point count
        n = n || 100;

        // Apply defaults for omitted optional parameters
        c = c !== undefined ? c : true;
        sA = sA || 0;
        eA = eA || TWO_PI;
        aC = aC || false;

        // Convert to radians if flagged as degrees
        sA = inDegrees === true ? sA * ( Math.PI / 180 ) : sA;
        eA = inDegrees === true ? eA * ( Math.PI / 180 ) : eA;

        var angleStep = ( eA - sA ) / n;
        angleStep = aC ? angleStep * -1 : angleStep;

        // Auto close when the total angle is close to a full circle, this prevents
        // small gaps appearing where the 2 ends meet, even when at a full revolution.
        c = ( eA - sA ) > TWO_PI * 0.9999 ? true : c;

        // Draw circle
        ctx.save();
        ctx.translate( x, y );
        ctx.beginPath();

        for ( var i = 0; i < n; i++ ) {

            // Start at -90 degrees to align first point to 'north'
            var angle = ( Math.PI * -0.5 ) + sA + angleStep * i;

            var point = pointOnCircle( 0, 0, r, angle );

            if ( i === 0 ) {

                ctx.moveTo( point.x, point.y );
            }
            else {

                ctx.lineTo( point.x, point.y );
            }
        }

        if ( c ) { ctx.closePath(); }
        ctx.restore();

    };

});
