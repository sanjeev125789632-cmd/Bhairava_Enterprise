const fs = require('fs');
const path = require('path');

const logoPngPath = path.join(__dirname, 'assets', 'images', 'logo.png');
const favPngPath = path.join(__dirname, 'favicon-32x32.png');

const logoBase64 = fs.readFileSync(logoPngPath).toString('base64');
const favBase64 = fs.readFileSync(favPngPath).toString('base64');

// Build SVG for logo.svg
const logoSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${logoBase64}" width="512" height="512"/>
</svg>`;

// Build SVG for favicon.svg
const favSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <image href="data:image/png;base64,${favBase64}" width="32" height="32"/>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'assets', 'images', 'logo.svg'), logoSvgContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'favicon.svg'), favSvgContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'thank-you', 'favicon.svg'), favSvgContent, 'utf-8');

console.log('Successfully generated SVG wrappers for logo.svg and favicon.svg!');
