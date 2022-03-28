import drawRoundedRect, { drawRoundedRectConfig } from './drawRoundedRect';

/**
 * Convenience function to "fill" a rounded rect drawn with drawRoundedRect()
 */
export const fillRoundedRect = (
  ctx: CanvasRenderingContext2D,
  config?: drawRoundedRectConfig,
) => {
  drawRoundedRect(ctx, config);
  ctx.fill();
};

export default fillRoundedRect;
