# APEXREST for Codex content refresh

Verified on 2026-09-22. Initial QA covered the local implementation. A subsequent explicit user request authorized committing and pushing this result to main; Pages settings and DNS remain unchanged.

## Scope

English and Ukrainian homepages now lead with the Codex plugin, practical APEX tasks, compiler-backed checks, the current-session default, optional reviewed teams, installation and documentation. The former Jira/team sales narrative is removed from the main flow; pi-apex and pi-slack-team remain related projects in the footer. Existing logo geometry, palette, typography and static architecture are preserved. CSS changes support the new content only.

Metadata, SoftwareApplication structured data, sitemap dates and both 1200 × 630 social previews match the product focus. The original visual brandbook remains the design reference; its historical positioning is not the current product specification.

## Current product sources

GitHub API resolved `apexrest-dev/apexrest-codex` main to **`c590dd64cd1240e3972519a84302ca3d85b5c926`**, committed 2026-09-22, “Document public apexrest npm installation and publication”. Sources were read at that revision, including their Ukrainian counterparts:

- [README](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md) and [README.uk](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.uk.md): positioning, current version, capabilities and publication.
- [Getting started](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/getting-started.md): npm / marketplace registration and prerequisites.
- [Work modes](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/work-modes.md): existing Codex session by default; teams require explicit Settings opt-in.
- [Deployment safety](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/deployment-safety.md): source/target plan, backup, scoped dev/test authorization and separate production approval.
- [ORDS](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/ords.md) and [Codex Cloud](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/codex-cloud.md): direct/HTTPS connections; Cloud CLI + ORDS does not establish native Cloud plugin/MCP/panel support.
- [Release notes](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/release-notes.md), [changelog](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/CHANGELOG.md), [implementation status](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/implementation-status.md): compact context and programmatic waiting; no claimed token-saving percentage or new blanket integration evidence.
- [Oracle APEX overview](https://docs.oracle.com/en/database/oracle/apex/26.1/apxdc/introduction.html): platform components and runtime foundation.

The live [npm registry](https://registry.npmjs.org/apexrest) confirmed public package **`apexrest`**, version **`0.4.0-beta.1`**, both `latest` and `beta` tags, published **2026-09-22T07:28:12.643Z**. The displayed command pins that version. npm installs the CLI/resources; **Install plugin** is a separate registration step. GitHub tags and Releases were empty at verification. Historical changelog statements about earlier non-publication do not override the current registry result. Cached web rendering of the GitHub root showed an older README; the live pinned GitHub API documents were used instead.

## Validation

- `node --check assets/js/site.js`, `xmllint --noout sitemap.xml`, CSS brace balance and `git diff --check`: passed.
- Local HTML links/assets and unique fragment IDs: passed across EN, UK, 404 and the two social sources. EN/UK IDs match; JSON-LD parses and identifies version 0.4.0-beta.1.
- All 20 linked plugin guide/changelog paths exist in the live GitHub tree at the revision above. The repository, license, npm metadata and linked Oracle overview were also checked. External sites were read, not installed or modified.
- Headless Chrome via existing Playwright: both languages at **320, 390, 768, 1024 and 1440 px**, with no horizontal overflow, broken images, failed page resources or JavaScript errors.
- Checked three example requests, source labels and animated gate states; reduced-motion behavior; mobile navigation, Escape/focus return, close on anchor selection and viewport resize; language switching; skip link; expandable alternative installation; no-JavaScript navigation; 404 rendering.
- Social previews rendered from existing HTML authoring sources, 1200 × 630, and visually inspected. Desktop/mobile hero and content sections were also inspected.

No plugin installation, database mutation or Oracle runtime test was performed: this task changes website information. Product evidence retains the version and scope documented by its upstream project.

## Preview

From this worktree:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

- English: <http://127.0.0.1:8000/>
- Ukrainian: <http://127.0.0.1:8000/uk/>

The QA screenshots and machine-readable browser report are temporary local artifacts under `/private/tmp/apexrest-landing-qa/`; they are not published assets. The Pages staging allowlist is unchanged and excludes this report and the brand authoring files.

## Publication preparation

The parallel main-checkout contact change was retained: public email links and Organization email metadata were removed in favor of the supplied LinkedIn destination. The parallel source notes and updated repository guidance were preserved. Other parallel changes are retained in a named Git stash before integrating this reviewed worktree.
