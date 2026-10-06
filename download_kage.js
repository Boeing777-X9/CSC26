const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

const TARGET_DIR = path.resolve('d:/ojash ppts/CSC/site/CSC26');

async function downloadJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return await res.json();
}

async function downloadBinary(url, dest, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const fileStream = fs.createWriteStream(dest);
      await pipeline(res.body, fileStream);
      return;
    } catch (e) {
      if (i === retries - 1) throw e;
      console.log(`Retrying ${url} (${i + 1}/${retries})...`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function main() {
  console.log('Fetching JSON bundle...');
  const bundle = await downloadJson('https://threeui.com/source-code/kage-landing-page.json');
  
  const requiredSrcFiles = [
    'src/shaders/landing-pages/LandingPages.tsx',
    'src/shaders/landing-pages/pageTypography.ts',
    'src/shaders/landing-pages/pageRecipes.ts',
    'src/shaders/landing-pages/LandingPageFrame.tsx',
    'src/shaders/threeui.css'
  ];

  for (const file of bundle.files) {
    if (requiredSrcFiles.includes(file.path)) {
      const destPath = path.join(TARGET_DIR, file.path);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      const content = file.code || file.content;
      if (content !== undefined) {
        fs.writeFileSync(destPath, content, 'utf8');
        console.log('Wrote text file:', file.path);
      }
    }
  }

  const binaryAssets = [
    'public/landing-pages/kage.html',
    'public/landing-pages/secret-pathways-assets/fonts.css',
    'public/landing-pages/secret-pathways-assets/three.min.js',
    'public/landing-pages/secret-pathways-assets/generated/kage-sanmon-preview.webp',
    'public/landing-pages/secret-pathways-assets/generated/kage-approach.webp',
    'public/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp',
    'public/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/temple-wall.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/pine-tree.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/sakura-branch.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/maple-leaves.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/stone-lantern.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/garden-bush.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/basalt-stones.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/hill.webp',
    'public/landing-pages/secret-pathways-assets/foreground/png/shrine-ruins.webp'
  ];

  for (const assetPath of binaryAssets) {
    const urlPath = assetPath.startsWith('public/') ? assetPath.slice(7) : assetPath;
    const url = `https://threeui.com/${urlPath}`;
    const destPath = path.join(TARGET_DIR, assetPath);
    if (fs.existsSync(destPath)) {
      console.log('Skipping existing asset:', assetPath);
      continue;
    }
    console.log('Downloading asset:', assetPath, 'from', url);
    await downloadBinary(url, destPath);
  }
  
  console.log('Done!');
}

main().catch(console.error);
