# Redesign verification

Date: 2026-09-12. Local implementation based on repository revision `3ee1957`.

## Website

- English and Ukrainian routes reviewed at widths 320, 390, 768, 1024 and 1440 px.
- No horizontal overflow, broken images, failed resource requests, console errors or external runtime requests in the browser checks.
- Mobile menu checked with Enter/Space, Escape, focus return, navigation-link close and desktop resize. Both languages pass.
- All three sample missions checked with keyboard activation, rapid switching and reduced motion. Illustrative wording is explicit; no backend actions occur.
- The mobile no-JavaScript fallback exposes navigation and retains the readable sample mission.
- The 404 page was served and visually reviewed with the new logo and local fonts.
- Local HTML `href`/`src` references, unique IDs, fragment targets, JSON-LD parsing, CSS URLs and SVG XML checked.
- JavaScript syntax, sitemap XML, CSS brace balance and `git diff --check` pass.

## Brand assets

- All 20 supplied source files match their archived SHA-256 checksums and the supplied originals.
- SVG exports preserve original paths and polygon points. The monochrome variant comes from the supplied monochrome artwork.
- All 16 local WOFF2 files decode in Chrome. Latin, Latin-ext, Cyrillic and Cyrillic-ext coverage checked.
- English and Ukrainian social previews rendered from local HTML at 1200 × 630 and visually reviewed.
- Brandbook PDF: nine A4 landscape pages, tagged output, readable Ukrainian text, working links and no detected layout overflow. All pages rendered with Poppler and visually reviewed; changed pages checked again after alignment with the final site typography.

## Pages staging

The actual staging command block from `.github/workflows/pages.yml` was run into a temporary directory. All 35 public files were present and the staged HTML references passed validation. The brandbook, original artwork archive and authoring tools are excluded from Pages staging.

This records local verification. Remote Pages settings, DNS, publication and live external-link availability were not changed or revalidated as part of the visual redesign.
