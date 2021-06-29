import { cursorTo, clearScreenDown } from "readline";
import fs from "fs";

/**
 * Promisify a function from the `readline` package.
 * @param func {(stream: NodeJS.WritableStream, ...args: any[], cb?: () => void) => void}
 * @param args {any[]}
 * @returns
 */
const screen = async (func, ...args) => {
  return new Promise((resolve) => func(process.stdout, ...args, resolve));
};

const reset = async () => {
  await screen(cursorTo, 0, 0);
  await screen(clearScreenDown);
};

/**
 * Write data to the terminal at the current cursor position.
 * @param data {string|Buffer}
 * @returns {Promise<void>}
 */
const write = async (data) => {
  return new Promise((resolve, reject) => {
    process.stdout.write(data, (error) => {
      error ? reject(error) : resolve();
    });
  });
};

/**
 * Delay for at least `timeout` milliseconds.
 * @param timeout {number}
 * @returns {Promise<void>}
 */
const sleep = async (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const palette = " ·+*&#@";

/**
 * @typedef {(x: number, y: number, time: number) => number} PixelFunc
 */

/**
 * Build a 2D character array.
 * @param width {number}
 * @param height {number}
 * @param pixelFunc {PixelFunc}
 * @returns {string[][]}
 */
const buildBuffer = (width, height, pixelFunc) => {
  const timestamp = new Date().getTime();
  const buffer = [];

  for (let y = 0; y < height; y++) {
    const line = [];

    for (let x = 0; x < width; x++) {
      const lightness = pixelFunc(x / width, y / height, timestamp / 1000);
      const clamped = Math.max(0, Math.min(0.99, lightness));
      const char = palette[Math.floor(clamped * palette.length)];
      line.push(char ?? " ");
    }

    buffer.push(line);
  }

  return buffer;
};

/**
 * Render the shader to the screen.
 * @param lastBuffer {string[][]|null}
 * @param width {number}
 * @param height {number}
 * @param pixelFunc {PixelFunc}
 */
const renderFrame = async (lastBuffer, width, height, pixelFunc) => {
  const buffer = buildBuffer(width, height, pixelFunc);

  for (let y = 1; y < height; y++) {
    if (buffer[y] === lastBuffer?.[y]) continue;

    await screen(cursorTo, 0, y);
    await write(buffer[y].join(""));
  }

  return buffer;
};

/**
 * Render the status to the screen.
 * @param statusLine {string}
 * @param width {number}
 */
const renderStatus = async (statusLine, width) => {
  // Status line goes at the top of the screen.
  await screen(cursorTo, 0, 0);
  await write(statusLine.slice(0, width).padEnd(width));
};

const main = async () => {
  let [_node, _mjs, shaderPath, ..._rest] = process.argv;

  if (!shaderPath) {
    console.error("Usage: node render.mjs <file.mjs>");
    return;
  }

  if (!shaderPath.startsWith("./") && !shaderPath.startsWith("/")) {
    shaderPath = `./${shaderPath}`;
  }

  let width = process.stdout.columns ?? 80;
  let height = process.stdout.rows ?? 40;

  process.stdout.on("resize", async () => {
    width = process.stdout.columns;
    height = process.stdout.rows;

    await reset();
    lastBuffer = null;
  });

  let shaderModule = await import(shaderPath);

  let lastBuffer = null;
  let reloadCount = 0;
  let statusLine = "Loaded successfully!";

  fs.watchFile(shaderPath, { interval: 250 }, async () => {
    try {
      shaderModule = await import(`${shaderPath}?reloadCount=${++reloadCount}`);
      statusLine = "Reloaded successfully!";
    } catch (e) {
      statusLine = e.toString();
    }
  });

  await reset();

  try {
    shaderModule.fragment(0, 0, 0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  while (true) {
    try {
      lastBuffer = await renderFrame(
        lastBuffer,
        width,
        height,
        shaderModule.fragment
      );
    } catch (e) {
      statusLine = e.toString();
    }

    await renderStatus(statusLine, width);
    await sleep(10);
  }
};

main();
