import {
  distance,
  add,
  mul,
  sub,
  normalize,
  abs,
  rotate3DX,
  rotate3DY,
  rotate3DZ,
  max,
} from "./shaderLib.mjs";

let globalTime = 0;

/**
 * Signed-distance-function for a sphere.
 * @param point {[number, number, number]}
 * @param center {[number, number, number]}
 * @param radius {number}
 * @returns {number}
 */
const sphereSDF = (point, center, radius) => {
  return distance(point, center) - radius;
};

/**
 * Signed-distance-function for a box.
 * @param point {[number, number, number]}
 * @param size {[number, number, number]}
 * @returns {number}
 */
const boxSDF = (point, size) => {
  const center = [0.0, 0.0, 0.0];
  const q = sub(abs(point), size);
  // length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0)
  return distance(max(q, 0.0), center) + Math.min(Math.max(...q), 0.0);
};

const intersectSDF = (a, b) => Math.max(a, b);
const subtractSDF = (a, b) => Math.max(a, -b);
const unionSDF = (a, b) => Math.min(a, b);

const sceneSDF = (point) => {
  const rotatedPoint = rotate3DY(
    rotate3DX(point, Math.sin(globalTime)),
    Math.cos(globalTime)
  );
  return unionSDF(
    subtractSDF(
      boxSDF(rotatedPoint, [0.9, 0.9, 0.9]),
      sphereSDF(point, [0, 0, 0], 1.1)
    ),
    sphereSDF(rotatedPoint, [Math.sin(globalTime) * 2.5, 0, 0], 0.3)
  );
};

/**
 * Get the surface normal at a point.
 * @param point {[number, number, number]}
 * @returns {[number, number, number]}
 */
const normal = (point) => {
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
const HIT_DISTANCE = 0.001;

/**
 * Perform ray matching.
 * @param source {[number, number, number]}
 * @param direction {[number, number, number]}
 * @param time {number}
 * @returns {number}
 */
const rayMarch = (source, direction) => {
  let distanceTraveled = 0;

  for (let i = 0; i < MAX_STEPS; ++i) {
    const currentPos = add(source, mul(direction, distanceTraveled));

    const distanceToScene = sceneSDF(currentPos);
    if (distanceToScene < HIT_DISTANCE)
      return normal(currentPos)[0] * 0.5 + 0.6;

    distanceTraveled += distanceToScene;
    if (distanceTraveled > MAX_DISTANCE) break;
  }

  return 0;
};

export const fragment = (x, y, time) => {
  globalTime = time;
  x -= 0.5;
  y -= 0.5;
  const source = [0, 0, -5];
  const direction = normalize([x, y, 1]);

  return rayMarch(source, direction);
};
