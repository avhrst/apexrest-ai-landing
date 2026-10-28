# Website content sources

## Blog link and description (2026-10-28)

- The user supplied [blog.apex.rest](https://blog.apex.rest/) as the blog destination. Sites metadata identifies it as **APEXREST Journal — ORCL APEX**, with the description “A home for Oracle APEX and PL/SQL enthusiasts.”
- The existing blog's local source (`dist/index.html` in its Sites checkout) describes Oracle APEX and PL/SQL community news, hands-on resources, tools, events and worldwide job listings. The landing page summarizes those categories in English and Ukrainian, with links in navigation, documentation and the footer. Organization structured data also points to the blog.
- An unauthenticated HTTPS request returned **401 / Sign in required** on 2026-10-28. The blog currently requires ChatGPT sign-in. This change does not alter its access policy or claim public access.
- Before this edit, `python3 scripts/check-site.py --external` found two existing issues: `docs/panel.md` returned **404**, and the [npm registry](https://registry.npmjs.org/apexrest) reported `latest` **2.1.0** while the landing page still presents **1.3.0**. They remain outside this blog-link change. The new blog link also returns 401 to the unauthenticated external checker; it is not treated as a passing public-link check.
- Product metadata and social preview artwork remain unchanged because this edit adds a related reading destination without changing the product description. Both landing-page sitemap dates are updated to 2026-10-28.

## Earlier product verification

Verified on **2026-10-04**. This document records the source basis for the landing-page content. It is a repository-only audit note, not a release announcement or proof that the landing page has been published. Updating these local files does not deploy the website.

## Verified source snapshot

- Canonical product repository: [apexrest-dev/apexrest](https://github.com/apexrest-dev/apexrest).
- GitHub's [main commit API](https://api.github.com/repos/apexrest-dev/apexrest/commits/main) returned **`13a5c617f7fa74d4cdf1ac09925b4322f4a77500`**, committed **2026-09-30T08:48:56Z**: “docs: verify npm 1.3.0 beta publication”. [Pinned commit](https://github.com/apexrest-dev/apexrest/commit/13a5c617f7fa74d4cdf1ac09925b4322f4a77500).
- [npm registry metadata](https://registry.npmjs.org/apexrest) reported `latest` = **`1.2.0`** (published **2026-09-24T15:16:40.929Z**) and `beta` = **`1.3.0-beta.1`**. Declared Node engine **`>=24 <27`**, license Apache-2.0. [Public package page](https://www.npmjs.com/package/apexrest).
- The site presents **1.2.0** as the current release and mentions 1.3.0-beta.1 only as an experimental preview. `scripts/check-site.py --external` compares the page's `softwareVersion` with npm `latest`.
- Upstream `docs/getting-started.md` and `docs/index.md` still name 1.1.0 at this revision; the README and the live registry are authoritative for the current version.
- The LinkedIn destination was supplied explicitly by the user. Treat it as the requested contact link; do not infer additional ownership, endorsement or customer claims from it.

## Change since the 2026-09-22 record

[Upstream 1.0.0](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/CHANGELOG.md#L15) removed plugin-owned model sessions, task registration, role routing, team tools/skill and panel controls. `docs/work-modes.md` and `docs/agent-workflow.md` no longer exist. The site no longer describes agent teams, work modes or model routing.

## Repository rename, 1.3.0 and Claude Code (2026-10-06)

The repository was renamed to [apexrest-dev/apexrest](https://github.com/apexrest-dev/apexrest) (main at `28bca28968ff11abb0cf4f7a3050933e7e9e69cb`); the site links use the new name. Upstream [README](https://github.com/apexrest-dev/apexrest/blob/28bca28968ff11abb0cf4f7a3050933e7e9e69cb/README.md), [CHANGELOG](https://github.com/apexrest-dev/apexrest/blob/28bca28968ff11abb0cf4f7a3050933e7e9e69cb/CHANGELOG.md) and [release notes](https://github.com/apexrest-dev/apexrest/blob/28bca28968ff11abb0cf4f7a3050933e7e9e69cb/docs/release-notes.md) declare `apexrest@1.3.0` the stable npm `latest`: 11 MCP tools instead of 21, 5 host-neutral skills instead of 14, a pooled SQLcl engine with structured diagnostics, `apexrest_ship` plan/apply with plan-bound grants, `apexrest_apex_sync` working copies, hardened deployment safety and Claude Code support (`claude plugin marketplace add apexrest-dev/apexrest`, `claude plugin install apexrest@apexrest`). The terminal UI, panel server, `$apexrest-menu`/`$apexrest-panel` and Ukrainian docs were removed; the panel is a read-only status snapshot. At the user's request the site presents 1.3.0 and these features in the "What's new" section.

**Boundary:** at 2026-10-06T07:40Z the [npm registry](https://registry.npmjs.org/apexrest) still reported `latest` = 1.2.0 and `beta` = 1.3.0-beta.1 with no 1.3.0 entry, so publication lagged the documentation; `check-site.py --external` fails until it lands. [Implementation status](https://github.com/apexrest-dev/apexrest/blob/28bca28968ff11abb0cf4f7a3050933e7e9e69cb/docs/implementation-status.md) records connected Oracle, authenticated browser and native-host Codex/Claude Code checks as NOT RUN; the site says so. Upstream has no `*.uk.md` documents, so the Ukrainian page links to the English docs. Sections below predate this change and describe the earlier 1.2.0 text.

## Installation text

Use the unpinned command documented by the README, which installs npm `latest`:

```sh
npm install -g apexrest
apexrest --version
apexrest
```

The last command opens the terminal menu. **Install tools** handles missing client dependencies; **Install plugin** separately registers APEXREST in Codex. Restart Codex and start a new task after registration. npm installation alone is not plugin registration, Oracle provisioning, connection configuration or application deployment. Pin with `apexrest@1.2.0`. Sources: [README 59–81](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L59-L81).

The alternative native registration path is unchanged:

```sh
codex plugin marketplace add apexrest-dev/apexrest
codex plugin add apexrest-apex@apexrest
```

Direct registration alone does not add an `apexrest` launcher to shell PATH.

## Claims and boundaries

| Topic | Supported website statement | Important boundary | Pinned source |
| --- | --- | --- | --- |
| Core purpose | Build and change Oracle APEX applications with Codex, from source changes to a controlled import and verification workflow. | Not a guarantee that every generated app passes or is production-ready. Independent of Oracle and OpenAI. | [README 9–13](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L9-L13) |
| Current conversation | Describe the change in the open Codex chat or use `$apexrest-work`; implementation uses that conversation's context, model and permissions. `$apexrest-menu` shows all functions. | No plugin startup call, model sessions, model selection or agent teams. | [Chat workflow 5](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/docs/chat-workflow.md#L5), [README 116](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L116) |
| Development panel | `$apexrest-panel` shows project/connection settings, Oracle/APEX jobs and diagnostics; Direct listener or ORDS; Codex or external verification browser. | The panel cannot grant trust or deployment authorization, or apply a plan. Opening a browser is not verification. | [Panel 25–39](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/docs/panel.md#L25-L39) |
| Catalogs | Offline catalogs: 109 component families and 58 reusable UX patterns with compiler-checked APEXlang recipes. | Compiler readiness does not imply SQL, import or browser verification; 1 component and 15 pattern recipes remain unresolved. | [README 29–31](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L29-L31) |
| Database access | Direct Oracle listener or ORDS HTTP(S), including APEXlang import/export. | Needs an existing authorized account; keep credentials out of prompts. | [README 25](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L25) |
| Controlled delivery | Plans bind source, toolchain and target; existing apps get verified SQL backups; an explicit dev/test request authorizes its scoped import. | Production needs an externally signed approval on a protected runner. Unknown outcomes require reconciliation. | [README 142](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L142), [Deployment safety 37](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/docs/deployment-safety.md#L37) |
| Cloud option | A documented setup runs the bundled CLI in a Cloud container over ORDS HTTPS. | Does not establish native Cloud plugin/MCP discovery, panel support or an end-to-end Cloud run. | [README 57](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L57), [Cloud guide 5](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/docs/codex-cloud.md#L5) |
| Release status | 1.2.0 is npm `latest`; 1.3.0-beta.1 previews experimental Composer and working copies. | No signed GitHub artifacts, Git tag or full platform/Oracle qualification. Connected imports, recovery and broader platforms remain open. | [README 19](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/README.md#L19), [Implementation status 55](https://github.com/apexrest-dev/apexrest/blob/13a5c617f7fa74d4cdf1ac09925b4322f4a77500/docs/implementation-status.md#L55) |

Prerequisites are unchanged from the previous record: Codex with native plugin support, Node 24 LTS (24–26), Java 21 and reviewed SQLcl 26.1.2, an existing Oracle APEX 26.1+ target, and a saved SQLcl connection or plugin-local ORDS credentials.

## Raw-source record

SHA-256 of the raw documents read at the pinned revision.

| File | SHA-256 |
| --- | --- |
| `README.md` | `3ebf67076704e27c1501e9a82ad9a08dbf39cac34cde96d1d2654c1d5e694fa4` |
| `README.uk.md` | `4aed4011b5c9612142b294af57b81e7691e7a723e0b2cbfcbc3e0943d62a42ee` |
| `CHANGELOG.md` | `75bc682fb6ba0b693b027c8c210169541d3941e90aada99afda1994aa3c69cb9` |
| `docs/getting-started.md` | `a842082dd09be491fd793f4594dec994952a41eb23ee15d68cc7bc4f8d4fd624` |
| `docs/getting-started.uk.md` | `ccc524a0c26293c414b56aa76b7b2a2cf4a436e626d14a5134aefb28ae7c3b20` |
| `docs/chat-workflow.md` | `1872dffe81582953a65c58c9b12cfe84060c50591310949d48f0b2e783777ca0` |
| `docs/chat-workflow.uk.md` | `6371281ff4ff708f1f008e065c65acff66d22c43b623c27e440f91744efc0ef8` |
| `docs/panel.md` | `4b1a9906b1d208c8fb64b50a3f542bb2506f4dafc70546affaf787355dd6966d` |
| `docs/panel.uk.md` | `a1d1830e8be2d495ab66dda62ffd57fc3324b8a81e945b11d1b34c34be0072ca` |
| `docs/deployment-safety.md` | `da5c8ad7c7c3d4aa26e29f8151e4f6db7a18da47e669a843b319f0a209f02063` |
| `docs/codex-cloud.md` | `389546c66bb931ecdd7f81843403ba29a25c3c6088ca130a81f8d657773a9210` |
| `docs/release-notes.md` | `990c34411ff24755f85cf6dca5aabe66737758377983fdd19913c7e001bd1ca5` |
| `docs/implementation-status.md` | `af6c5c065cf4339af12ced2b770ee1dcc33e518a72a03651d15f6ad756aff7fe` |
| `docs/pattern-catalog.md` | `1b91c415b5fbc60e182bc22c016d207e4af57951635ea34bbd7b4f7f43f4551e` |
| `docs/component-catalog.md` | `08b35fdfaba505c7a1f91721623c6c0300c75501c706cfb41643d5d5427fcac0` |
