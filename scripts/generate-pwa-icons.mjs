import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

// SVG template for AIDA JECC PWA Icon
const createSvgIcon = (width, height, isMaskable = false) => {
  const padding = isMaskable ? width * 0.15 : width * 0.05;
  const contentWidth = width - padding * 2;
  const contentHeight = height - padding * 2;
  const center = width / 2;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d12" />
      <stop offset="50%" stop-color="#080808" />
      <stop offset="100%" stop-color="#14081c" />
    </linearGradient>

    <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${width * 0.02}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  ${isMaskable ? `<rect width="${width}" height="${height}" fill="url(#bgGrad)"/>` : `<rect width="${width}" height="${height}" rx="${width * 0.22}" fill="url(#bgGrad)"/>`}
  
  <!-- Ambient Inner Border Glow -->
  <rect x="${padding * 0.5}" y="${padding * 0.5}" width="${width - padding}" height="${height - padding}" rx="${isMaskable ? 0 : width * 0.18}" fill="none" stroke="url(#primaryGlow)" stroke-width="${width * 0.008}" stroke-opacity="0.3" />

  <!-- Central Graphic Group -->
  <g transform="translate(${padding}, ${padding})">
    <!-- Neural Node Circuits -->
    <path d="M ${contentWidth * 0.2} ${contentHeight * 0.75} L ${contentWidth * 0.5} ${contentHeight * 0.25} L ${contentWidth * 0.8} ${contentHeight * 0.75} Z" 
          fill="none" stroke="url(#primaryGlow)" stroke-width="${width * 0.035}" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
    
    <line x1="${contentWidth * 0.32}" y1="${contentHeight * 0.55}" x2="${contentWidth * 0.68}" y2="${contentHeight * 0.55}" 
          stroke="url(#primaryGlow)" stroke-width="${width * 0.035}" stroke-linecap="round" filter="url(#glow)" />

    <!-- Node Points -->
    <circle cx="${contentWidth * 0.5}" cy="${contentHeight * 0.25}" r="${width * 0.035}" fill="#ffffff" filter="url(#glow)" />
    <circle cx="${contentWidth * 0.2}" cy="${contentHeight * 0.75}" r="${width * 0.035}" fill="#38bdf8" filter="url(#glow)" />
    <circle cx="${contentWidth * 0.8}" cy="${contentHeight * 0.75}" r="${width * 0.035}" fill="#c084fc" filter="url(#glow)" />

    <!-- Subtitle Text AIDA -->
    <text x="${contentWidth * 0.5}" y="${contentHeight * 0.92}" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-weight="900" 
          font-size="${width * 0.095}px" 
          fill="#ffffff" 
          text-anchor="middle" 
          letter-spacing="${width * 0.02}">AIDA</text>
  </g>
</svg>
`;
};

async function generateIcons() {
  console.log('[pwa-icons] Generating PWA icons...');
  
  const targets = [
    { name: 'pwa-192x192.png', size: 192, maskable: false },
    { name: 'pwa-512x512.png', size: 512, maskable: false },
    { name: 'apple-touch-icon.png', size: 180, maskable: false },
    { name: 'pwa-maskable-512x512.png', size: 512, maskable: true },
  ];

  for (const { name, size, maskable } of targets) {
    const svgStr = createSvgIcon(size, size, maskable);
    const outputPath = path.join(publicDir, name);
    await sharp(Buffer.from(svgStr))
      .png()
      .toFile(outputPath);
    console.log(`[pwa-icons] Generated ${name}`);
  }

  console.log('[pwa-icons] All PWA icons generated successfully!');
}

generateIcons().catch((err) => {
  console.error('[pwa-icons] Error generating icons:', err);
  process.exit(1);
});
