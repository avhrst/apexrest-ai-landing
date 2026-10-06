# APEXREST repository guidance

## Scope

These instructions apply to the entire repository.

## Project purpose

This repository contains the public product site for APEXREST, the open-source plugin for creating and changing Oracle APEX applications in Codex and Claude Code. It works in the user's current session. Upstream 1.0.0 removed plugin-owned agent teams, model routing and work modes; do not advertise them. The product combines readable APEXlang, compiler-backed validation, scoped imports and runtime verification. Preserve explicit human authority for development targets and production release.

Do not restore the former 1C/BAS news blog, monitoring feeds, bilingual redirect, or daily generated-news workflow.

## Architecture

Keep the site static and framework-free unless the user explicitly requests an architectural change. GitHub Pages publishes a staged public surface without a package manager or build framework.

- `index.html` — page content, metadata, and structured data
- `assets/css/site.css` — visual system and responsive layout
- `assets/js/site.js` — mobile navigation and the illustrative mission-gate interaction
- `assets/brand/` — supplied APEXREST logo exports and favicon
- `assets/fonts/` — self-hosted Manrope and IBM Plex Mono with OFL licences
- `assets/og.png` and `assets/og-uk.png` — social preview images
- `uk/index.html` — complete Ukrainian page with a visible language switch
- `brand/` — editable HTML/PDF brandbook, source archive and authoring tools (repository-only)
- `404.html` — branded GitHub Pages fallback
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow; runs the site checks before staging
- `.github/workflows/site-links.yml` — weekly external-link and npm-version check
- `scripts/check-site.py` — standard-library site checks (repository-only)
- `CNAME` — custom domain
- `robots.txt` and `sitemap.xml` — crawler configuration

## Local preview

Run a static server from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content guardrails

- Say “production-grade foundation” rather than claiming every AI-generated application is automatically production-ready.
- “Deterministic vibe coding” describes the delivery gates, not deterministic LLM behavior.
- Do not claim autonomous deployment, zero defects, guaranteed security, customer results, or unsupported performance metrics.
- Keep import and release described as explicit human decisions.
- Preserve the disclaimer that APEXREST is independent of Oracle and `pi-apex` is an independent integration, not an Oracle product.
- Use current `apexrest-dev/apexrest` documentation and Oracle documentation as primary sources. Check npm publication before making installation claims; record evidence in `docs/content-sources.md`.
- Claude Code support is in the source repository but not in the published npm packages (1.2.0 / 1.3.0-beta.1 carry the earlier Codex-only surface); describe Claude Code installation through the plugin marketplace only, and keep the end-to-end session and published-marketplace caveats until upstream closes them. Distinguish the local native plugin from the separate Cloud CLI + ORDS setup. Do not imply unverified native Cloud integration or end-to-end Cloud support.
- Product questions link to `https://www.linkedin.com/in/avhrst/`; keep the removed general email contact out of the site.
- Keep the site in English unless the user asks for another language.

## Change expectations

- Follow `brand/BRANDBOOK.md`: warm paper, near-black Manrope typography, IBM Plex Mono labels, fine rules and numbered gates. Use the supplied APEXREST pencil-and-ruler logo with its original blue, yellow and coral colours; dark red is the accessible action/focus colour and green marks verified states.
- Preserve supplied artwork geometry and the immutable originals in `brand/source/`. Do not recreate the wordmark as text or introduce archived Oracle-related marks as endorsements.
- Keep the English and existing Ukrainian pages visually and semantically aligned, including metadata and accessible labels.
- Avoid generic AI imagery, neon, glassmorphism, particles, fake terminals, unsupported logos, testimonials, or invented metrics.
- Maintain keyboard access, visible focus, reduced-motion behavior, semantic landmarks, descriptive labels, and mobile layouts.
- Update page metadata, structured data, sitemap dates, and the social preview when a content change makes them stale.
- Do not add dependencies or external runtime services for behavior that can remain static.

## Verification

After relevant changes:

- Run `node --check assets/js/site.js` for JavaScript changes.
- Run `python3 scripts/check-site.py` after every change; add `--external` before content changes to catch moved upstream docs and a newer npm `latest`.
- Run `xmllint --noout sitemap.xml` when the sitemap changes.
- Check CSS brace balance and run `git diff --check`.
- Verify that local `href` and `src` targets exist and that fragment links resolve to unique IDs.
- Serve the site locally when changes affect routing, public assets, or runtime interaction.

## Publishing

The Pages workflow stages the public files and deploys after a push to `main`. GitHub Pages must use **GitHub Actions** as its source, and `apex.rest` must be configured in the repository Pages settings. DNS and HTTPS changes remain repository-owner actions. Do not push, change Pages settings, or change DNS unless the user explicitly asks.
