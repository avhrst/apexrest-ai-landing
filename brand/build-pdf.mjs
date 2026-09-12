#!/usr/bin/env node
// Reproduce brandbook.pdf from repository-local HTML, SVG and fonts.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.dirname(here);
const require = createRequire(import.meta.url);
let playwright;
for (const candidate of [
  'playwright',
  process.env.BRANDBOOK_NODE_MODULES && path.join(process.env.BRANDBOOK_NODE_MODULES, 'playwright'),
  path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),
].filter(Boolean)) {
  try { playwright = require(candidate); break; } catch {}
}
if (!playwright) throw new Error('Playwright is required for PDF generation. Set BRANDBOOK_NODE_MODULES to its node_modules directory.');
const chrome = process.env.BRANDBOOK_CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(repo, '.' + pathname);
    if (!file.startsWith(repo + path.sep) || !(await stat(file)).isFile()) throw new Error('Not found');
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(await readFile(file));
  } catch { response.writeHead(404); response.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await playwright.chromium.launch({ headless: true, ...(chrome ? { executablePath: chrome } : {}) });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  const broken = [];
  page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) broken.push(response.url()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/brand/brandbook.html`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode())); });
  const result = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    return { pageCount: pages.length, fontStatus: document.fonts.status, overflows: pages.flatMap((page, i) => {
      const footer = page.querySelector('.footer').getBoundingClientRect();
      return [...page.children].filter(el => !el.classList.contains('footer') && !el.classList.contains('rail') && el.getBoundingClientRect().bottom > footer.top - 7).map(el => ({ page: i + 1, element: el.tagName, className: el.className, bottom: el.getBoundingClientRect().bottom, footer: footer.top }));
    }) };
  });
  if (broken.length || result.pageCount !== 9 || result.overflows.length) throw new Error(JSON.stringify({ broken, ...result }, null, 2));
  const output = path.join(here, 'brandbook.pdf');
  await page.pdf({ path: output, format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false, tagged: true });
  console.log(JSON.stringify({ output, ...result }, null, 2));
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
