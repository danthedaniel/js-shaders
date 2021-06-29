import { add, mul, sub, normalize } from "./shaderLib.mjs";

export const intersectSDF = (a, b) => Math.max(a, b);
export const subtractSDF = (a, b) => Math.max(a, -b);
export const unionSDF = (a, b) => Math.min(a, b);

/**
 * Get the surface normal at a point.
 * @param sceneSDF {(point: [number, number, number]) => number}
 * @param point {[number, number, number]}
 * @returns {[number, number, number]}
 */
const normal = (sceneSDF, point) => {
  const step = 0.001;

  const gradientX =
    sceneSDF(add(point, [step, 0, 0])) - sceneSDF(sub(point, [step, 0, 0]));
  const gradientY =
    sceneSDF(add(point, [0, step, 0])) - sceneSDF(sub(point, [0, step, 0]));
  const gradientZ =
    sceneSDF(add(point, [0, 0, step])) - sceneSDF(sub(point, [0, 0, step]));

  return normalize([gradientX, gradientY, gradientZ]);
};

const MAX_STEPS = 32;
const MAX_DISTANCE = 10;
const HIT_DISTANCE = 0.002;

/**
 * Perform ray marching.
 * @param source {[number, number, number]}
 * @param direction {[number, number, number]}
 * @param sceneSDF {(point: [number, number, number]) => number}
 * @returns {number}
 */
export const rayMarch = (source, direction, sceneSDF) => {
  let distanceTraveled = 0;

  for (let i = 0; i < MAX_STEPS; ++i) {
    const currentPos = add(source, mul(direction, distanceTraveled));

    const distanceToScene = sceneSDF(currentPos);
    if (distanceToScene < HIT_DISTANCE)
      return normal(sceneSDF, currentPos)[0] * 0.5 + 0.6;

    distanceTraveled += distanceToScene;
    if (distanceTraveled > MAX_DISTANCE) break;
  }

  return 0;
};
