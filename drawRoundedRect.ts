export type drawRoundedRectConfig = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  radius?: number | number[];
};

/**
 * Draw a rounded rectangle on the provided canvas 2d context.
 * Radius can be supplied as a single number, applied to all
 * corners, or as an array of separate values per corner.
 *
 * Adapted from http://stackoverflow.com/a/3368118
 *
 * @param ctx Canvas 2D context to draw upon
 * @param config Configuration object
 * @param config.x The x-axis coordinate of the rectangle's starting point
 * @param config.y The y-axis coordinate of the rectangle's starting point
 * @param config.width The rectangle's width
 * @param config.height The rectangle's height
 * @param config.radius Radius of all four corners as a number, or individual corners as an array following CSS border-radius shorthand order
 */
export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  { x = 0, y = 0, width, height, radius = 10 }: drawRoundedRectConfig = {
    width: 100,
    height: 100,
  },
) => {
  // Radius multiplier to render as closely as possible to css border-radius apperance
  const MAGIC_RATIO = 1.167;

  // Clamp to positive numbers less than the 1/2 canvas height to prevent artifacts
  const clamp = (r: number) => Math.max(Math.min(r, height / 2), 0);

  const r =
    typeof radius === 'number'
      ? Array(4).fill(clamp(radius) * MAGIC_RATIO)
      : radius.map((_, i) => clamp(radius[i]) * MAGIC_RATIO);

  ctx.beginPath();
  ctx.moveTo(x + r[0], y);
  ctx.lineTo(x + width - r[1], y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r[1]);
  ctx.lineTo(x + width, y + height - r[2]);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r[2], y + height);
  ctx.lineTo(x + r[3], y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r[3]);
  ctx.lineTo(x, y + r[0]);
  ctx.quadraticCurveTo(x, y, x + r[0], y);
  ctx.closePath();
};

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

export default drawRoundedRect;
