'use strict';

/*
 * Generate the footer logo: an all-white version of the primary Matari logo,
 * sized 20% smaller than the 400px primary asset (=> 320px wide).
 *
 * "All white" is done by forcing every RGB channel to full brightness (255)
 * while preserving the original alpha channel, so the logo's shape/edges are
 * kept exactly and only the color changes.
 *
 * Usage: node scripts/make-footer-logo.js
 */

const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', '_legacy', 'logoclear5.png'); // hi-res source
const OUT = path.join(__dirname, '..', 'src', 'assets', 'img', 'logo-matari-white.png');
const WIDTH = 320; // 20% smaller than the 400px primary logo

(async () => {
  // Resize first (fewer pixels to process), keep alpha, then read raw RGBA.
  const { data, info } = await sharp(SRC)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Force RGB to white; leave alpha untouched.
  for (let i = 0; i < data.length; i += info.channels) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
    .toFile(OUT);

  const m = await sharp(OUT).metadata();
  console.log(
    `Wrote ${path.relative(path.join(__dirname, '..'), OUT)} — ${m.width}x${m.height}, white on transparent.`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
