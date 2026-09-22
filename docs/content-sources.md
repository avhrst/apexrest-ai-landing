# Website content sources

Verified on **2026-09-22**. This document records the source basis for the landing-page content update. It is a repository-only audit note, not a release announcement or proof that the landing page has been published. Updating these local files does not deploy the website.

## Verified source snapshot

- Canonical product repository: [apexrest-dev/apexrest-codex](https://github.com/apexrest-dev/apexrest-codex).
- GitHub's [main commit API](https://api.github.com/repos/apexrest-dev/apexrest-codex/commits/main) returned **`c590dd64cd1240e3972519a84302ca3d85b5c926`**, committed **2026-09-22T07:33:34Z**: “Document public apexrest npm installation and publication”. [Pinned commit](https://github.com/apexrest-dev/apexrest-codex/commit/c590dd64cd1240e3972519a84302ca3d85b5c926).
- The local product checkout was clean at that exact SHA. The ten pinned raw documents listed below were fetched from GitHub and compared byte-for-byte with the local files; all matched.
- [npm registry metadata](https://registry.npmjs.org/apexrest) reported both `latest` and `beta` as **`0.4.0-beta.1`**, with publication time **2026-09-22T07:28:12.643Z**. The version's declared Node engine is **`>=24 <27`** and its executable is `apexrest` → `dist/runtime/apexrest.mjs`. [Version endpoint](https://registry.npmjs.org/apexrest/0.4.0-beta.1), [public package page](https://www.npmjs.com/package/apexrest).
- At verification, GitHub's [latest-release endpoint](https://api.github.com/repos/apexrest-dev/apexrest-codex/releases/latest) returned HTTP 404 and [tags endpoint](https://api.github.com/repos/apexrest-dev/apexrest-codex/tags?per_page=5) returned `[]`. npm availability does not establish a GitHub release, signed stable release, or successful connected verification of every capability.
- The LinkedIn destination was supplied explicitly by the user. Treat it as the requested contact link; do not infer additional ownership, endorsement or customer claims from it.

## Installation text

Use this exact, version-pinned global-install example:

```sh
npm install -g apexrest@0.4.0-beta.1
apexrest --version
apexrest
```

The last command opens the terminal menu. **Install tools** handles missing client dependencies; **Install plugin** separately registers APEXREST in Codex. Restart Codex and start a new task after registration. npm installation alone is not plugin registration, Oracle provisioning, connection configuration or application deployment. The documentation also supports unpinned `npm install -g apexrest` and project-local `npm install apexrest` followed by `npx apexrest`.

An alternative native registration path, for an existing suitable Node/Codex installation, is:

```sh
codex plugin marketplace add apexrest-dev/apexrest-codex
codex plugin add apexrest-apex@apexrest
```

These commands register the plugin; direct registration alone does not add an `apexrest` launcher to shell PATH. No local TypeScript build is required for the checked-in bundle. Sources: [README installation, lines 76–139](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L76-L139), [Ukrainian equivalent, lines 76–139](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.uk.md#L76-L139).

## Claims and boundaries

| Topic | Supported website statement | Important boundary | Pinned source |
| --- | --- | --- | --- |
| Core purpose | Build and change Oracle APEX applications with Codex, from source changes to a controlled import and verification workflow. | A workflow capability is not a guarantee that every generated app passes or is production-ready. APEXREST is independent of Oracle and OpenAI. | [README 9–23](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L9-L23) |
| New and existing applications | Generate Oracle APEXlang, start from a blank or CRM template, or adopt an existing application while preserving Oracle IDs and metadata. | Preserve unrelated pages, shared components and authentication; compiler component coverage is not universal. | [README 149–175](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L149-L175), [deployment safety 11–13](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/deployment-safety.md#L11-L13) |
| Work in the current chat | Single-agent mode uses the user's current Codex session. | No separate worker, automatic panel, independent peer QA, plugin token accounting or plugin-enforced run timeout in this mode. | [Work modes 5–20](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/work-modes.md#L5-L20) |
| Optional reviewed teams | Explicitly enabled teams have a manager, one to three developers, independent QA, code review and final review. | Teams require explicit Settings opt-in. Merely requesting `team` at launch cannot enable them. Required checks must pass; unavailable checks are not success. | [Work modes 5–20](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/work-modes.md#L5-L20) |
| Database access | Choose a direct Oracle listener or ORDS HTTP(S), including APEXlang import/export. | Needs an existing authorized database account, correct schema URL and REST-Enabled SQL for ORDS. Keep credentials out of prompts and repositories. | [README 27](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L27), [getting started 176–200](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/getting-started.md#L176-L200) |
| Controlled delivery | Plans bind source, toolchain and target; existing apps get verified SQL backups; authorization, identity and drift checks precede writes. | An explicit identified development/test task can authorize its scoped import. Production has a separate signed approval on a protected runner. Lost responses can remain `outcome_unknown`; no automatic retry is implied. | [Deployment safety 5–25](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/deployment-safety.md#L5-L25) |
| Browser verification | Check the configured APEX application in Codex's in-app browser or an external browser. | Opening a URL is not verification. Authentication, usable controls and observed affected interactions are required; automated suites have separate configuration. | [Work modes 22–31](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/work-modes.md#L22-L31) |
| Less repeated context | Current-session execution, scoped metadata batches and focused reference retrieval reduce repeated tool/model exchanges. | Local payload measurements do not demonstrate billed-token savings, customer performance, or new Oracle/native-task coverage. Use no unsupported percentages. | [Release notes 5–18](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/release-notes.md#L5-L18), [changelog 5–12](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/CHANGELOG.md#L5-L12) |
| Cloud option | A documented setup runs the bundled CLI inside a Cloud container and accesses an authorized database through ORDS HTTPS. | The Cloud example does not establish native plugin/MCP discovery, desktop panel support, reviewed teams, browser verification or an end-to-end Cloud run. It remains pinned to a separate `0.2.0-beta.1+codex.20260919143707` build. | [Cloud guide 5–29](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/codex-cloud.md#L5-L29), [Cloud guide 112–131](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/codex-cloud.md#L112-L131) |
| Beta status | Public npm package `0.4.0-beta.1` is available. | Stable qualification remains open. Historical connected evidence retains its tested version and scope; a version bump is not a new connected test. | [README 19](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L19), [README 185–194](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L185-L194), [npm registry](https://registry.npmjs.org/apexrest) |

## Requirements and verification scope

[Getting started, lines 13–24](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/getting-started.md#L13-L24) and [Ukrainian equivalent](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/docs/getting-started.uk.md#L13-L24) specify:

- Codex with native plugin support. Codex CLI `0.154.0` on macOS arm64 is recorded exercised evidence, not a universal minimum-version or cross-platform guarantee.
- Node 24 LTS recommended; package-supported Node range is 24–26.
- Java 21 and reviewed SQLcl `26.1.2` for Oracle generation, validation, export and import. ORDS requires a JDK with `jdk.compiler`.
- An existing Oracle APEX `26.1+` target and authorized direct SQLcl or ORDS connection for connected work.
- Chromium and the relevant dependencies for browser/API suites. utPLSQL is needed only when a selected SQL suite requires it; service tables are not a blanket prerequisite for an application-only import.

The recorded native installation, Oracle compilation, unchanged ORDS round trip and local runtime checks have distinct scopes. Do not describe every feature, every platform, changed imports or recovery paths as end-to-end verified. See [README evidence table, 185–194](https://github.com/apexrest-dev/apexrest-codex/blob/c590dd64cd1240e3972519a84302ca3d85b5c926/README.md#L185-L194).

The September 21 release notes describe what a commit/push does not publish; older sections describe then-unpublished candidates. They are historical statements. For the current npm publication state, use the September 22 README and the live registry result above. The Cloud bootstrap's older version pin is also separate from the current npm release.

## Raw-source parity record

All files below matched the pinned public raw source and the clean local product checkout byte-for-byte. SHA-256 hashes identify exactly the reviewed document bytes.

| File | SHA-256 |
| --- | --- |
| `README.md` | `9774db28ab57641ab8c95812df122767b4ee20dbc80a2a74485eed503606242b` |
| `README.uk.md` | `c546c607876f0acd415b339249c9f4e2ffd0089ed8d230b37d2096c47c7e7a7a` |
| `docs/getting-started.md` | `6bc3ef0f992ab383d3ec570758f25e5d9f49cb55652cbd6abd60672560676f62` |
| `docs/getting-started.uk.md` | `1981584b4cdbb0f169305ea2be05db30ff2aafbabd33589c875911bd4a7e220c` |
| `docs/work-modes.md` | `e71dd3b7775e905ef5e525bdc5e7f356d50661207ad668fa7ab8f3f4a4b3a8b1` |
| `docs/work-modes.uk.md` | `ecd965f64121acc7b77441c7a3da5b43d2a49e7bae18cd98f9bb3d42238dc0fb` |
| `docs/codex-cloud.md` | `9e9a1786c09b09c49ac47b27d0f6f9e7ca21d83f7ae9ed0b97656bb941f78209` |
| `docs/release-notes.md` | `bd7449e9a832c7ba833d16841af897d5d4828a813637ecb6cb4a90191fed9c22` |
| `CHANGELOG.md` | `ad2b07a43a342cdf5878bf811fe48c1917c1ef009a1cdef6d3db7cc4c0245d28` |
| `docs/deployment-safety.md` | `492833d55f4bf468533809702f08f87c8274f7688d572cb410e60bc78bedbb56` |
