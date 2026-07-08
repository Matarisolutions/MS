'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const frontMatter = require('gulp-front-matter');
const markdown = require('gulp-markdown');
const layout = require('gulp-layout');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');

// CSS bundle order: vendor first, theme, then our overrides last so they win.
const CSS_BUNDLE = [
  'src/assets/css/bootstrap.min.css',
  'src/assets/css/fontawesome.min.css',
  'src/assets/css/magnific-popup.min.css',
  'src/assets/css/swiper-bundle.min.css',
  'src/assets/css/style.css',
  'src/assets/css/custom.css',
];

// JS bundle order: jQuery first, then plugins, then the theme's main.js last.
const JS_BUNDLE = [
  'src/assets/js/vendor/jquery-3.7.1.min.js',
  'src/assets/js/swiper-bundle.min.js',
  'src/assets/js/bootstrap.min.js',
  'src/assets/js/scrollCue.min.js',
  'src/assets/js/jquery.magnific-popup.min.js',
  'src/assets/js/jquery.counterup.min.js',
  'src/assets/js/imagesloaded.pkgd.min.js',
  'src/assets/js/isotope.pkgd.min.js',
  'src/assets/js/main.js',
];

const paths = {
  pages: 'src/pages/**/*.md',
  layouts: 'src/layouts/**/*',
  // Copy fonts, images and favicons verbatim. Exclude the CSS/JS that get
  // bundled and sourcemaps (wave.js is copied separately — see waveScript).
  assets: ['src/assets/**/*', '!src/assets/**/*.css', '!src/assets/**/*.map', '!src/assets/js/**'],
  // Loaded inline on the home page for the hero wave effect, so it stays unbundled.
  wave: 'src/assets/js/wave.js',
  // Root static files served as-is: robots.txt, sitemap.xml.
  static: 'src/*.{xml,txt}',
  dist: 'dist',
};

// Remove the build output so every build starts clean.
function clean() {
  return fs.promises.rm(paths.dist, { recursive: true, force: true });
}

// Markdown pages -> parse front-matter -> render markdown -> wrap in the layout.
function html() {
  return src(paths.pages)
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(
      layout((file) => ({
        ...file.frontMatter,
        layout: `src/layouts/${file.frontMatter.layout}`,
        // Output path (e.g. "about.html") so the layout can build canonical/OG URLs.
        page: file.relative.split(path.sep).join('/'),
      }))
    )
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// Bundle + minify all CSS into one file. rebase:false keeps the Font Awesome
// `../fonts/...` URLs valid, since the bundle lives in the same assets/css dir.
function styles() {
  return src(CSS_BUNDLE)
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({ rebase: false }))
    .pipe(dest(`${paths.dist}/assets/css`))
    .pipe(browserSync.stream());
}

// Bundle + minify all JS into one file, in dependency order (jQuery first).
function scripts() {
  return src(JS_BUNDLE)
    .pipe(concat('app.min.js'))
    .pipe(terser())
    .pipe(dest(`${paths.dist}/assets/js`))
    .pipe(browserSync.stream());
}

// encoding:false keeps binary bytes (images, fonts) intact under Gulp 5.
function assets() {
  return src(paths.assets, { encoding: false, base: 'src' })
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// wave.js stays unbundled and is referenced inline on the home page.
function waveScript() {
  return src(paths.wave, { base: 'src' }).pipe(dest(paths.dist));
}

function staticFiles() {
  return src(paths.static, { base: 'src', allowEmpty: true }).pipe(dest(paths.dist));
}

const build = series(clean, parallel(html, styles, scripts, assets, waveScript, staticFiles));

function serve() {
  browserSync.init({
    server: { baseDir: paths.dist },
    notify: false,
  });

  watch([paths.pages, paths.layouts], html);
  watch(CSS_BUNDLE, styles);
  watch(JS_BUNDLE, scripts);
  watch(paths.assets, assets);
  watch(paths.wave, waveScript);
  watch(paths.static, staticFiles);
}

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.wave = waveScript;
exports.static = staticFiles;
exports.build = build;
exports.serve = series(build, serve);
exports.default = exports.serve;
