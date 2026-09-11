import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';

const publicDir = path.resolve('public');
const logoUrl = 'https://ik.imagekit.io/AIDA/Assets%20for%20Web/title-logo.png?updatedAt=1738306541949';

function fetchImageBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch logo, status code: ${res.statusCode}`));
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function generateIcons() {
  console.log('[pwa-icons] Fetching official AIDA logo...');
  let logoBuffer;
  try {
    logoBuffer = await fetchImageBuffer(logoUrl);
    console.log('[pwa-icons] Official logo fetched successfully.');
  } catch (err) {
    console.error('[pwa-icons] Could not fetch remote logo, fallback to local generation:', err.message);
  }

  const targets = [
    { name: 'pwa-192x192.png', size: 192, maskable: false },
    { name: 'pwa-512x512.png', size: 512, maskable: false },
    { name: 'apple-touch-icon.png', size: 180, maskable: false },
    { name: 'pwa-maskable-512x512.png', size: 512, maskable: true },
  ];

  for (const { name, size, maskable } of targets) {
    const outputPath = path.join(publicDir, name);

    if (logoBuffer) {
      // Create dark themed circular/rounded container with AIDA logo centered
      const padding = maskable ? Math.round(size * 0.2) : Math.round(size * 0.12);
      const innerSize = size - (padding * 2);

      const resizedLogo = await sharp(logoBuffer)
        .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();

      // Background SVG container matching AIDA dark & red theme
      const bgSvg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#17171c" />
              <stop offset="100%" stop-color="#080808" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ef4444" />
              <stop offset="50%" stop-color="#dc2626" />
              <stop offset="100%" stop-color="#991b1b" />
            </linearGradient>
          </defs>
          ${maskable 
            ? `<rect width="${size}" height="${size}" fill="url(#grad)"/>` 
            : `<rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#grad)"/>`}
          <rect x="${Math.round(size * 0.04)}" y="${Math.round(size * 0.04)}" 
                width="${Math.round(size * 0.92)}" height="${Math.round(size * 0.92)}" 
                rx="${maskable ? 0 : Math.round(size * 0.18)}" 
                fill="none" stroke="url(#ringGrad)" stroke-width="${Math.max(2, Math.round(size * 0.015))}" stroke-opacity="0.6"/>
        </svg>
      `;

      await sharp(Buffer.from(bgSvg))
        .composite([{ input: resizedLogo, top: padding, left: padding }])
        .png()
        .toFile(outputPath);

    } else {
      // Fallback
      console.warn(`[pwa-icons] Warning: logoBuffer missing for ${name}`);
    }

    console.log(`[pwa-icons] Generated ${name} (${size}x${size})`);
  }

  console.log('[pwa-icons] All official PWA icons generated!');
}

generateIcons().catch((err) => {
  console.error('[pwa-icons] Error generating icons:', err);
  process.exit(1);
});
