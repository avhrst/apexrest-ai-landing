# APEXREST

Static English and Ukrainian landing pages for AI delivery teams working with Oracle APEX. AI agents plan, build and verify; people control the critical import and release decisions.

The September 2026 redesign uses the supplied APEXREST pencil-and-ruler identity, warm paper, near-black type and the logo's blue, yellow and coral accents. Plain HTML, CSS and JavaScript; no package manager, framework or runtime font service.

## Preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

- English: <http://127.0.0.1:8000/>
- Ukrainian: <http://127.0.0.1:8000/uk/>
- Brandbook: <http://127.0.0.1:8000/brand/brandbook.html>

Both language pages are complete static documents with an EN / UA switch and no automatic redirect. Their metadata, headings, contact email drafts and interactive messages remain aligned. HTML uses the standard `uk` language code; UA is the visible label. The sample mission is an illustration and executes no real imports or releases.

## Brandbook and assets

- [Brandbook PDF](brand/brandbook.pdf) — nine designed pages in Ukrainian.
- [Visual HTML brandbook](brand/brandbook.html) — editable, printable source.
- [Brand rules](brand/BRANDBOOK.md) — palette, typography, spacing, components and usage.
- [Original sources and provenance](brand/source/README.md) — all supplied files preserved with SHA-256 checksums.
- `assets/brand/` — cropped vector exports, monochrome and reversed logos, symbol and favicon.
- [Local fonts](assets/fonts/README.md) — Manrope and IBM Plex Mono, Latin/Cyrillic coverage and OFL licences.
- `brand/social/` — editable 1200 × 630 English and Ukrainian social-card sources.

The later `APEXREST-logo` folder supplies the primary identity. The earlier phonetic `apeks` mark, Oracle-related artwork and seasonal artwork remain archived references. They are not shown as partner logos or deployed as public website assets.

Regenerate logo exports with `python3 brand/tools/export_logos.py`. PDF and social-image render helpers are authoring tools only; the published site does not depend on them. See the brandbook notes for PDF rendering instructions. For social previews, run `PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node brand/social/render.mjs` while the local server is running.

## Verification

The completed redesign checks are recorded in [brand/VERIFICATION.md](brand/VERIFICATION.md).

After changes, check JavaScript syntax, XML, CSS braces, whitespace, local asset paths and unique fragment targets. Serve both languages and the 404 page, verify narrow/mobile layouts, keyboard navigation, sample mission switching, reduced motion and the no-JavaScript fallback.

```sh
node --check assets/js/site.js
xmllint --noout sitemap.xml
git diff --check
```

The two pages share `assets/css/site.css`, `assets/js/site.js` and local fonts. Public images must also be included in `.github/workflows/pages.yml`. Keep the brandbook, authoring tools and source archive outside the staged Pages surface.

## Publishing

The GitHub Actions Pages workflow stages the public files after a push to `main`. It includes both language routes, the 404 page, local SVG logos, fonts/licences and social previews. It excludes the source archive and brandbook. GitHub Pages must use **GitHub Actions** as its source, with `apex.rest` configured as the domain. Pushing, changing Pages settings and changing DNS require an explicit user request.

The implementation story is grounded in [APEXREST for Codex](https://github.com/apexrest-dev/apexrest-codex), [pi-apex](https://github.com/avhrst/pi-apex), [pi-slack-team](https://github.com/avhrst/pi-slack-team), and [Oracle APEX documentation](https://docs.oracle.com/en/database/oracle/apex/26.1/apxdc/introduction.html).
