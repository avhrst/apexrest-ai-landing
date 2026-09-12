/**
 * Render the social previews from their HTML sources.
 * Start the repository's static server on port 8000 first.
 * Uses an existing Playwright installation and installed Chrome; adds no dependencies.
 *
 * PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node brand/social/render.mjs
 * Optional: APEXREST_PREVIEW_URL=http://localhost:8000/
 * Optional: APEXREST_CHROME_EXECUTABLE=/path/to/chrome
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const preview = new URL(process.env.APEXREST_PREVIEW_URL || "http://localhost:8000/");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.APEXREST_CHROME_EXECUTABLE
    ? { executablePath: process.env.APEXREST_CHROME_EXECUTABLE }
    : { channel: "chrome" }),
});

try {
  for (const [language, filename] of [["en", "og.png"], ["uk", "og-uk.png"]]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    const errors = [];
    await page.route("**/*", (route) => new URL(route.request().url()).origin === preview.origin
      ? route.continue()
      : route.abort());
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("requestfailed", (request) => errors.push(`Request failed: ${request.url()}`));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`);
    });
    await page.goto(new URL(`brand/social/${language}.html`, preview).href, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode()));
    });
    if (errors.length) throw new Error(errors.join("\n"));
    const output = fileURLToPath(new URL(`../../assets/${filename}`, import.meta.url));
    await page.screenshot({ path: output });
    console.log(`${language}: ${output} (1200 × 630)`);
    await page.close();
  }
} finally {
  await browser.close();
}
