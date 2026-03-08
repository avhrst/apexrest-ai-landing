# Multilanguage EN/UA — Design

## Summary
Add English as a second language to the APEXREST static site using separate HTML files per language. Ukrainian remains at `/`, English at `/en/`. Browser auto-detection redirects non-Ukrainian browsers to `/en/` on first visit; choice is persisted in `localStorage`.

## File structure (after)
```
/
├── index.html          # Ukrainian (modified: hreflang, lang switcher)
├── en/
│   └── index.html      # English (new, adapted content)
├── news.json           # Ukrainian news (unchanged)
├── en/
│   └── news.json       # English news (new)
├── style.css           # Shared (unchanged)
├── script.js           # Shared (add auto-redirect + dynamic news path)
├── robots.txt          # Unchanged
├── sitemap.xml         # Add /en/ entry
└── CLAUDE.md           # Update with multilanguage notes
```

## Changes

### 1. `index.html` (UA)
- Add `<link rel="alternate" hreflang="en" href="https://apex.rest/en/">`
- Add `<link rel="alternate" hreflang="uk" href="https://apex.rest/">`
- Add language switcher link in header nav (rightmost): "EN" → `/en/`

### 2. `en/index.html` (new)
- `<html lang="en">`, same layout/structure
- English-adapted content (not literal translation — adjusted for international audience)
- References `../style.css` and `../script.js`
- Own JSON-LD (FAQPage + Organization) in English
- hreflang tags pointing to both versions
- Language switcher: "UA" → `/`

### 3. `script.js`
- Auto-redirect: on root page, if no `localStorage('lang')` and `navigator.language` not `uk*`, redirect to `/en/`
- On language switcher click: save preference to `localStorage('lang')`
- News fetch: detect if page is in `/en/` subfolder and fetch `en/news.json` or `news.json` accordingly

### 4. `en/news.json` (new)
- English news items, same structure `{date, title, summary, tag}`

### 5. `sitemap.xml`
- Add `<url>` entry for `https://apex.rest/en/`

### 6. `CLAUDE.md`
- Document multilanguage structure

## Language switcher UI
Text link in header nav, rightmost. Current language shown as active/bold, other as link. Styled consistently with existing nav links.

## Auto-redirect logic
```
if currentPath === "/" AND !localStorage.getItem("lang") AND !navigator.language.startsWith("uk")
  → redirect to "/en/"
if user clicks switcher → localStorage.setItem("lang", chosen)
```

## SEO
- Each language page has own `<title>`, `<meta description>`, OG tags, JSON-LD
- `hreflang` alternate links on both pages
- Sitemap includes both URLs
- `<html lang="uk">` / `<html lang="en">` set correctly
