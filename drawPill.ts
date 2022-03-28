/**
 * Draw a rectangle with circular side caps, commonly used for buttons.
 *
 * @param ctx Canvas 2D context to draw upon
 * @param param1 Configuration object
 * @param config.x The x-axis coordinate of the rectangle's starting point
 * @param config.y The y-axis coordinate of the rectangle's starting point
 * @param config.width The rectangle's width
 * @param config.height The rectangle's height
 */
export const drawPill = (
  ctx: CanvasRenderingContext2D,
  { x = 0, y = 0, width, height }: drawPillConfig = {
    width: 150,
    height: 50,
  },
) => {
  ctx.beginPath();

  const radius = height / 2;

  ctx.moveTo(x + radius, y);

  // Top line
  ctx.lineTo(x + radius + (width - radius * 2), y);

  // Right cap
  ctx.arc(
    x + radius + (width - radius * 2),
    y + radius,
    radius,
    Math.PI * 1.5,
    Math.PI * 0.5,
  );

  // Bottom line
  ctx.lineTo(x + radius, y + height);

  // Left cap
  ctx.arc(x + radius, y + radius, radius, Math.PI * -1.5, Math.PI * -0.5);

  ctx.closePath();
};

export type drawPillConfig = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  radius?: number | number[];
};

export default drawPill;
