import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../public/work");

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

async function captureSignIn(page) {
  await page.goto("https://task-orbit-web.vercel.app/login", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, "taskorbit-1.png"),
    type: "png",
    fullPage: false,
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    colorScheme: "dark",
  });
  const page = await context.newPage();

  await captureSignIn(page);

  await browser.close();
  console.log("Captured sign-in screenshot at 2x DPR.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
