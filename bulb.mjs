import {
  distance,
  dot,
  magnitude,
  normalize,
  rotate3DX,
  rotate3DY,
  add,
  sub,
  abs,
  mul,
} from "./shaderLib.mjs";
import { unionSDF, subtractSDF, rayMarch } from "./marchLib.mjs";

const cos = Math.cos,
  sin = Math.sin,
  acos = Math.acos,
  atan = Math.atan,
  pow = Math.pow,
  log = Math.log,
  sqrt = Math.sqrt;

let globalTime = 0;

/**
 * Signed-distance-function for a Mandelbulb.
 * @param point {[number, number, number]}
 * @returns {number}
 */
const bulbSDF = (point) => {
  let pointIter = [...point];

  let m = dot(pointIter, pointIter);
  let dz = 1.0;

  for (let i = 0; i < 4; i++) {
    dz = 8.0 * pow(m, 3.5) * dz + 1.0;

    const [pointIter_x, pointIter_y, pointIter_z] = pointIter;
    const radius = magnitude(pointIter);
    const b = 8.0 * acos(pointIter_y / radius);
    const angle = 8.0 * atan(pointIter_x, pointIter_z);

    pointIter = add(
      point,
      mul([sin(b) * sin(angle), cos(b), sin(b) * cos(angle)], pow(radius, 8.0))
    );
    m = dot(pointIter, pointIter);

    if (m > 256) break;
  }

  return (0.25 * log(m) * sqrt(m)) / dz;
};

const sceneSDF = (point) => {
  const rotatedPoint = rotate3DY(
    rotate3DX(point, Math.sin(globalTime)),
    Math.cos(globalTime)
  );

  return bulbSDF(rotatedPoint);
};

export const fragment = (x, y, time) => {
  globalTime = time / 4;
  x -= 0.5;
  y -= 0.5;
  const source = [0, 0, -3 + 2 * Math.sin(globalTime)];
  const direction = normalize([x, y, 1]);

  return rayMarch(source, direction, sceneSDF);
};
