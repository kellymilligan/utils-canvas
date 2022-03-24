/**
 * Draw a circle on the provided CanvasRenderingContext2D using arc():
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
 *
 * @param ctx Canvas context to draw upon
 * @param x The horizontal coordinate of the circle's center
 * @param y The vertical coordinate of the circle's center.
 * @param radius The circle's radius. Must be positive.
 * @param startAngle The angle at which the circle starts in radians, measured from the positive x-axis.
 * @param endAngle The angle at which the circle ends in radians, measured from the positive x-axis.
 * @param counterclockwise Draws the circle counter-clockwise between the start and end angles
 * @param close Close the path after drawing
 */
export default function (
  ctx: CanvasRenderingContext2D,
  x = 0,
  y = 0,
  radius = 1,
  startAngle = 0,
  endAngle = Math.PI * 2,
  counterclockwise = false,
  close = true
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  if (close) {
    ctx.closePath();
  }
}
