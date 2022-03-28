import drawCircle, { drawCircleConfig } from './drawCircle';

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

export default fillCircle;
