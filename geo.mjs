import {
  distance,
  normalize,
  rotate3DX,
  rotate3DY,
  sub,
  abs,
  max,
} from "./shaderLib.mjs";
import { unionSDF, subtractSDF, rayMarch } from "./marchLib.mjs";

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

  return distance(max(q, 0.0), center) + Math.min(Math.max(...q), 0.0);
};

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

export const fragment = (x, y, time) => {
  globalTime = time;
  x -= 0.5;
  y -= 0.5;
  const source = [0, 0, -5];
  const direction = normalize([x, y, 1]);

  return rayMarch(source, direction, sceneSDF);
};
