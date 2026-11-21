// main.ts — news-image-20261120 round 4 entry program.
// COPIER / VALIDATOR ONLY. It does not generate the image: entry.png sits
// beside this file in the repo and is copied byte-identical to the output dir.
// Node stdlib only: node:fs, node:path, node:crypto, node:url.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const MAX_DIM = 1024;

function fail(msg: string): never {
  console.error("ERROR: " + msg);
  process.exit(1);
}

function main(): void {
  const repoDir = path.dirname(fileURLToPath(import.meta.url));
  const src = path.join(repoDir, "entry.png");
  if (!fs.existsSync(src)) fail("entry.png not found beside main.ts: " + src);

  const data = fs.readFileSync(src);
  if (data.length === 0) fail("entry.png is empty");
  if (data.length > MAX_BYTES) fail("entry.png is " + data.length + " bytes, over the 1 MiB limit");

  // PNG magic, 8 bytes.
  const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!data.subarray(0, 8).equals(magic)) fail("entry.png is not a PNG (bad magic)");

  // IHDR must be the first chunk; width/height are big-endian uint32 at offset 16/20.
  if (data.length < 33) fail("entry.png too short for an IHDR chunk");
  if (data.toString("ascii", 12, 16) !== "IHDR") fail("first PNG chunk is not IHDR");
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width === 0 || height === 0) fail("PNG has zero width or height");
  if (width > MAX_DIM || height > MAX_DIM) {
    fail("PNG is " + width + "x" + height + ", over the 1024x1024 limit");
  }

  // An IDAT chunk with image data must exist somewhere after IHDR.
  if (!data.includes(Buffer.from("IDAT", "ascii"))) fail("PNG has no IDAT chunk");

  // IEND chunk must be present (last 12 bytes of a minimal PNG).
  const iend = data.subarray(data.length - 12);
  if (iend.length < 12 || iend.toString("ascii", 4, 8) !== "IEND") {
    fail("PNG has no trailing IEND chunk");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, "entry.png");
  fs.writeFileSync(out, data);

  // Verify the copy byte-for-byte before reporting success.
  const back = fs.readFileSync(out);
  if (!back.equals(data)) fail("output copy differs from entry.png");

  const hash = crypto.createHash("sha256").update(data).digest("hex");
  console.log("OK: entry.png " + width + "x" + height + ", " + data.length + " bytes");
  console.log("OK: copied to " + out);
  console.log("OK: sha256 " + hash);
}

main();
