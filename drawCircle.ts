export type drawCircleConfig = {
  x?: number;
  y?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  counterclockwise?: boolean;
  close?: boolean;
};

/**
 * Draw a circle on the provided CanvasRenderingContext2D using arc():
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
 *
 * @param ctx Canvas 2D context to draw upon
 * @param config.x The horizontal coordinate of the circle's center
 * @param config.y The vertical coordinate of the circle's center
 * @param config.radius The circle's radius, must be positive
 * @param config.startAngle The angle at which the circle starts in radians, measured from the positive x-axis
 * @param config.endAngle The angle at which the circle ends in radians, measured from the positive x-axis
 * @param config.counterclockwise Draws the circle counter-clockwise between the start and end angles
 * @param config.close Close the path after drawing
 */
export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  {
    x = 0,
    y = 0,
    radius = 1,
    startAngle = 0,
    endAngle = Math.PI * 2,
    counterclockwise = false,
    close = true,
  }: drawCircleConfig = {},
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  if (close) {
    ctx.closePath();
  }
};

/**
 * Convenience function to "fill" a circle drawn with drawCircle()
 */
export const fillCircle = (
  ctx: CanvasRenderingContext2D,
  config?: drawCircleConfig,
) => {
  drawCircle(ctx, config);
  ctx.fill();
};

export default drawCircle;
