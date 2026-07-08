'use strict';

/*
 * Optimize raster images under src/assets/img for the web:
 *   - resize down to a sensible max width for the image's role (never enlarges)
 *   - re-encode PNG (palette-quantized) and JPG (mozjpeg) for smaller files
 *   - keeps the original format & path, so no HTML/CSS references change
 *   - never writes a file that ended up larger than the original
 *
 * Usage: node scripts/optimize-images.js   (or: npm run optimize)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.join(__dirname, '..', 'src', 'assets', 'img');

// Directories we leave untouched.
const SKIP_DIRS = new Set(['favicons']);

// Max width (px) by role. Logos/brand marks display small, so cap them tight
// (still 2x for retina). Everything else only shrinks if genuinely oversized.
function maxWidthFor(relPath) {
  const parts = relPath.split(path.sep);
  if (parts[0] === 'brand') return 400;
  if (relPath === 'logo-matari.png') return 400;
  return 1920;
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

const kb = (n) => (n / 1024).toFixed(1).padStart(7) + ' KB';

(async () => {
  const files = walk(IMG_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for (const file of files) {
    const rel = path.relative(IMG_DIR, file);
    const input = fs.readFileSync(file);
    const origSize = input.length;
    totalBefore += origSize;

    const image = sharp(input, { failOn: 'none' });
    const meta = await image.metadata();
    const cap = maxWidthFor(rel);
    const willResize = meta.width && meta.width > cap;

    let pipeline = sharp(input, { failOn: 'none' }).rotate();
    if (willResize) {
      pipeline = pipeline.resize({ width: cap, withoutEnlargement: true });
    }

    const isPng = /\.png$/i.test(file);
    pipeline = isPng
      ? pipeline.png({ compressionLevel: 9, effort: 10, palette: true, quality: 85 })
      : pipeline.jpeg({ quality: 80, mozjpeg: true });

    const output = await pipeline.toBuffer({ resolveWithObject: true });
    const newSize = output.data.length;

    // Write when we resized (correct sizing wins) or genuinely saved bytes.
    if (willResize || newSize < origSize) {
      fs.writeFileSync(file, output.data);
      totalAfter += newSize;
      changed++;
      const dims = willResize
        ? `${meta.width}x${meta.height} -> ${output.info.width}x${output.info.height}`
        : `${meta.width}x${meta.height}`;
      const pct = (((origSize - newSize) / origSize) * 100).toFixed(0);
      console.log(`${kb(origSize)} -> ${kb(newSize)}  (${pct}%)  ${rel}  [${dims}]`);
    } else {
      totalAfter += origSize;
    }
  }

  console.log('\n' + '-'.repeat(60));
  console.log(`Processed ${files.length} images, rewrote ${changed}.`);
  console.log(
    `Total: ${kb(totalBefore)} -> ${kb(totalAfter)}  ` +
      `(saved ${kb(totalBefore - totalAfter)}, ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
