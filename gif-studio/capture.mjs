/**
 * Deterministic frame capture for gif-studio/pie.html.
 *
 * Loads the master animation over file://, steps window.seek(t) from 0 to
 * DURATION at FPS, and writes PNG frames (2x scale) to gif-studio/frames/.
 *
 * Usage:
 *   node gif-studio/capture.mjs            -> all frames
 *   node gif-studio/capture.mjs 4500       -> single probe frame at t=4500ms
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const PAGE = "file:///" + join(__dir, "pie.html").replace(/\\/g, "/");
const OUT = join(__dir, "frames");

const FPS = 30;
const ANIM_MS = 4500;   // animated portion
const HOLD_MS = 1500;   // hold the finished frame
const TOTAL = ANIM_MS + HOLD_MS;

const probeT = process.argv[2] ? Number(process.argv[2]) : null;

const browser = await puppeteer.launch({
  channel: "chrome",
  headless: "new",
  args: ["--force-device-scale-factor=2", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 780, height: 640, deviceScaleFactor: 2 });
await page.goto(PAGE, { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  await Promise.all([
    document.fonts.load('900 42px "Kilimanjaro Sans"'),
    document.fonts.load("800 56px Montserrat"),
    document.fonts.load("700 20px Montserrat"),
    document.fonts.load("500 20px Montserrat"),
  ]);
  await document.fonts.ready;
});

if (probeT !== null) {
  await page.evaluate((t) => window.seek(t), probeT);
  await page.screenshot({ path: join(__dir, `probe_${probeT}.png`), omitBackground: true });
  console.log(`probe_${probeT}.png written`);
} else {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });
  const frames = Math.round((TOTAL / 1000) * FPS);
  for (let i = 0; i < frames; i++) {
    const t = Math.min((i / FPS) * 1000, ANIM_MS);
    await page.evaluate((tt) => window.seek(tt), t);
    await page.screenshot({
      path: join(OUT, `f_${String(i).padStart(4, "0")}.png`),
      omitBackground: true,
    });
    if (i % 30 === 0) console.log(`frame ${i}/${frames}`);
  }
  console.log(`done: ${frames} frames -> ${OUT}`);
}
await browser.close();
