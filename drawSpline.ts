/**
 * Draw a spline upon the provided CanvasRenderingContext2D
 *
 * @param ctx Canvas 2D context to draw upon
 * @param points Array of spline points returned from spline()
 * @param close Close the path after drawing
 */
export const drawSpline = (
  ctx: CanvasRenderingContext2D,
  points: Float32Array,
  close = false,
) => {
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 2, count = points.length; i < count; i += 2) {
    ctx.lineTo(points[i], points[i + 1]);
  }
  if (close) {
    ctx.closePath();
  }
};

/**
 * Convenience function to "fill" a spline drawn with drawSpline()
 */
export const fillSpline = (
  ctx: CanvasRenderingContext2D,
  points: Float32Array,
  close?: boolean,
) => {
  drawSpline(ctx, points, close);
  ctx.fill();
};
