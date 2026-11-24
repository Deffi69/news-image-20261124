// main.ts — entrypoint for the news-image-20261124 entry on make.fun.
//
// The deliverable of this entry is the newspaper front-page image that
// sits next to this file as entry.png. My whole job here is to carry
// that image to wherever the grader expects it, byte for byte, and to
// prove afterwards that the copy arrived intact.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The source image always lives in the same folder as this script,
// so resolve it from the script's own location rather than from
// whatever directory the caller happens to run in.
const here = dirname(fileURLToPath(import.meta.url));
const imagePath = join(here, "entry.png");

// Decide where the image has to land. Priority: an explicit path on
// the command line, then the OUTPUT_DIR environment variable, then
// the conventional /output folder. A destination ending in ".png" is
// taken to be the file itself; anything else is treated as a folder
// and the image keeps its entry.png name inside it.
function destinationPath(): string {
  const asked = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
  const absolute = resolve(asked);
  return absolute.endsWith(".png") ? absolute : join(absolute, "entry.png");
}

// SHA-256 fingerprint of a file's full contents, used to prove that
// the copied bytes are the original bytes and not just the same size.
function fingerprint(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function deliver(): void {
  const target = destinationPath();

  // Guard the source before copying anything: a missing image should
  // fail here with a clear message, and an empty one is never worth
  // delivering. The size recorded here is reused by the checks below.
  let originalSize: number;
  try {
    originalSize = statSync(imagePath).size;
  } catch {
    throw new Error(`source image is missing: ${imagePath}`);
  }
  if (originalSize === 0) {
    throw new Error(`source image is empty: ${imagePath}`);
  }

  // Create the destination folder chain if it is not there yet,
  // then perform the copy itself.
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(imagePath, target);

  // First check: both files must report the exact same byte count.
  const deliveredSize = statSync(target).size;
  if (deliveredSize !== originalSize) {
    throw new Error(
      `copy failed: entry.png is ${originalSize} bytes but the copy is ${deliveredSize} bytes`,
    );
  }

  // Second check: the digests must match, so a same-sized but altered
  // copy is still caught instead of silently passing.
  if (fingerprint(target) !== fingerprint(imagePath)) {
    throw new Error("copy failed: the delivered image's sha256 differs from entry.png");
  }

  console.log(`Delivered entry.png to ${target} (${deliveredSize} bytes)`);
}

deliver();
