import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const svgPath = join(rootDir, "src/lib/assets/favicon.svg");
const staticDir = join(rootDir, "static");

// SVG を読み込む
const svgBuffer = readFileSync(svgPath);

// 192x192 と 512x512 の PNG を生成
const sizes = [192, 512];

for (const size of sizes) {
  const outputPath = join(staticDir, `pwa-${size}x${size}.png`);
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outputPath);
  console.log(`✓ Generated ${outputPath}`);
}

console.log("✓ All icons generated successfully!");

