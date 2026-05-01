import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "public/glitch-logo.png";
const OUT_DIR = "public";

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

function makePng(size) {
  return sharp(SRC)
    .resize(size, size, { fit: "contain", background: transparent })
    .png()
    .toBuffer();
}

async function main() {
  const [buf16, buf32, buf48, buf180] = await Promise.all(
    [16, 32, 48, 180].map(makePng),
  );

  await fs.writeFile(path.join(OUT_DIR, "favicon-16x16.png"), buf16);
  await fs.writeFile(path.join(OUT_DIR, "favicon-32x32.png"), buf32);
  await fs.writeFile(path.join(OUT_DIR, "apple-touch-icon.png"), buf180);

  const ico = await pngToIco([buf16, buf32, buf48]);
  await fs.writeFile(path.join(OUT_DIR, "favicon.ico"), ico);

  console.log("✓ favicon-16x16.png");
  console.log("✓ favicon-32x32.png");
  console.log("✓ apple-touch-icon.png (180×180)");
  console.log("✓ favicon.ico (16/32/48 multi-size)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
