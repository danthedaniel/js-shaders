import { distance } from "./shaderLib.mjs";

/**
 * PixelFunc that renders an animated spiral.
 * @param x {number}
 * @param y {number}
 * @param time {number}
 * @returns {string}
 */
export const fragment = (x, y, time) => {
  const distFromCenter = distance([x, y], [0.5, 0.5]);
  const angle = Math.atan2(y - 0.5, x - 0.5) + time;

  const bandSize = 0.05;
  // prettier-ignore
  const bandLocation = ((distFromCenter + bandSize * (angle / 2 * Math.PI)) / bandSize) % 2;
  if (bandLocation >= 1) return 0;

  return bandLocation;
};
