import drawPill, { drawPillConfig } from './drawPill';

/**
 * Convenience function to "fill" a pill drawn with drawPill()
 */
export const fillPill = (
  ctx: CanvasRenderingContext2D,
  config?: drawPillConfig,
) => {
  drawPill(ctx, config);
  ctx.fill();
};

export default fillPill;
