import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../public/work");

const TARGET_WIDTH = 1920;
const WEBP_QUALITY = 92;

const assets = [
  {
    input: "taskorbit-cover.png",
    output: "taskorbit-cover.webp",
  },
  {
    input: "taskorbit-1.png",
    output: "taskorbit-1.webp",
  },
  {
    input: "taskorbit-2.png",
    output: "taskorbit-2.webp",
  },
  {
    input: "hisab-diary-cover.png",
    output: "hisab-diary-cover.webp",
  },
  {
    input: "hisab-diary-1.png",
    output: "hisab-diary-1.webp",
  },
  {
    input: "hisab-diary-2.png",
    output: "hisab-diary-2.webp",
  },
  {
    input: "wingshooter-cover.png",
    output: "wingshooter-cover.webp",
  },
  {
    input: "wingshooter-1.png",
    output: "wingshooter-1.webp",
  },
  {
    input: "wingshooter-2.png",
    output: "wingshooter-2.webp",
  },
];

async function optimizeImage({ input, output }) {
  const inputPath = path.join(outputDir, input);
  const outputPath = path.join(outputDir, output);

  const metadata = await sharp(inputPath).metadata();
  const shouldUpscale = (metadata.width ?? 0) < TARGET_WIDTH;

  let pipeline = sharp(inputPath);

  if (shouldUpscale) {
    pipeline = pipeline.resize(TARGET_WIDTH, null, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outputPath);

  const outputMeta = await sharp(outputPath).metadata();
  console.log(`${output}: ${outputMeta.width}x${outputMeta.height}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  for (const asset of assets) {
    await optimizeImage(asset);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
