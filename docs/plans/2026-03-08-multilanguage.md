# Multilanguage EN/UA Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add English language version of the APEXREST site with browser auto-detection and manual language switcher.

**Architecture:** Separate HTML files per language (`/index.html` for UA, `/en/index.html` for EN). Shared `style.css` and `script.js`. Browser language auto-detection on first visit redirects non-Ukrainian browsers to `/en/`. User choice persisted in `localStorage`.

**Tech Stack:** HTML, CSS, JS (no frameworks)

---

### Task 1: Add language switcher CSS and hreflang tags to Ukrainian page

**Files:**
- Modify: `style.css` (append lang switcher styles)
- Modify: `index.html:8-9` (add hreflang links), `index.html:129-135` (add switcher to nav)

**Step 1: Add language switcher CSS to `style.css`**

Append before the `/* === Responsive === */` comment at line 542:

```css
/* === Language Switcher === */
.lang-switch {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding-left: 16px;
  border-left: 1px solid var(--color-border);
}

.lang-switch a {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.lang-switch a:hover {
  color: #fff;
  text-decoration: none;
}

.lang-switch a.active {
  color: #fff;
  background: rgba(199, 70, 52, 0.2);
}
```

**Step 2: Add hreflang tags to `index.html`**

After line 9 (`<link rel="canonical"...>`), add:

```html
  <link rel="alternate" hreflang="uk" href="https://apex.rest/">
  <link rel="alternate" hreflang="en" href="https://apex.rest/en/">
  <link rel="alternate" hreflang="x-default" href="https://apex.rest/">
```

**Step 3: Add language switcher to nav in `index.html`**

After the `</nav>` closing tag (line 135), add inside the `.container` div:

```html
      <div class="lang-switch">
        <a href="/" class="active" data-lang="uk">UA</a>
        <a href="/en/" data-lang="en">EN</a>
      </div>
```

**Step 4: Add responsive style for lang-switch in mobile nav**

In the `@media (max-width: 768px)` section, add:

```css
  .lang-switch {
    border-left: none;
    margin-left: 0;
    padding-left: 0;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
  }
```

**Step 5: Verify locally**

Run: `python3 -m http.server 8000`
Open: `http://localhost:8000` — confirm UA/EN switcher appears in header nav. EN link should 404 (expected, not created yet).

**Step 6: Commit**

```bash
git add style.css index.html
git commit -m "feat: add language switcher UI and hreflang tags to UA page"
```

---

### Task 2: Update `script.js` with auto-redirect and dynamic news path

**Files:**
- Modify: `script.js`

**Step 1: Rewrite `script.js` with language detection and dynamic news path**

Replace entire `script.js` with:

```js
document.addEventListener('DOMContentLoaded', () => {
  // --- Language auto-redirect ---
  const isEnPage = location.pathname.startsWith('/en');
  const savedLang = localStorage.getItem('lang');

  // Auto-redirect only on root, only if no saved preference
  if (!savedLang && !isEnPage && location.pathname === '/') {
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (!browserLang.startsWith('uk')) {
      localStorage.setItem('lang', 'en');
      location.replace('/en/');
      return;
    }
  }

  // Save language preference on switcher click
  document.querySelectorAll('.lang-switch a[data-lang]').forEach(link => {
    link.addEventListener('click', () => {
      localStorage.setItem('lang', link.dataset.lang);
    });
  });

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '\u2715' : '\u2630';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '\u2630';
      });
    });
  }

  // --- News section ---
  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  const newsPath = isEnPage ? '../en/news.json' : 'news.json';
  const fallbackEmpty = isEnPage ? 'No news to display yet.' : 'Поки що немає новин для відображення.';
  const fallbackError = isEnPage ? 'Failed to load news. Please refresh the page.' : 'Не вдалося завантажити новини. Спробуйте оновити сторінку.';
  const defaultTag = isEnPage ? 'Update' : 'Оновлення';

  fetch(newsPath, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to load news');
      return response.json();
    })
    .then(news => {
      const items = Array.isArray(news) ? news.slice(0, 4) : [];
      if (!items.length) {
        newsList.innerHTML = `<p class="news-fallback">${fallbackEmpty}</p>`;
        return;
      }

      newsList.innerHTML = items
        .map(item => `
          <article class="news-card">
            <div class="news-meta">
              <span class="news-tag">${item.tag || defaultTag}</span>
              <time datetime="${item.date}">${item.date}</time>
            </div>
            <h3>${item.title || ''}</h3>
            <p>${item.summary || ''}</p>
          </article>
        `)
        .join('');
    })
    .catch(() => {
      newsList.innerHTML = `<p class="news-fallback">${fallbackError}</p>`;
    });
});
```

**Step 2: Verify UA page still works**

Run: `python3 -m http.server 8000`
Open: `http://localhost:8000` — news should still load, nav toggle should work.

**Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add language auto-redirect and dynamic news path"
```

---

### Task 3: Create English page `en/index.html`

**Files:**
- Create: `en/index.html`

**Step 1: Create `/en/` directory**

```bash
mkdir -p en
```

**Step 2: Create `en/index.html`**

Create the full English page. Key differences from Ukrainian version:
- `<html lang="en">`
- English `<title>`: "Oracle APEX: Modern Alternative to Legacy ERP Systems | APEXREST"
- English `<meta description>`, OG tags, Twitter tags
- `<link rel="canonical" href="https://apex.rest/en/">`
- hreflang tags (same as UA page)
- All paths to shared assets use `../` prefix: `../style.css`, `../script.js`
- Language switcher: UA link is active=false, EN link is active=true
- JSON-LD structured data in English
- All content adapted for international audience (not Ukraine-specific legal focus, more general Oracle APEX benefits vs legacy ERP)
- Q&A: 9 questions about Oracle APEX vs legacy ERP (data migration, accounting, customization, integrations, security, TCO, timeline, risks, operational)
- Monitoring: 7 cards about global market trends for ERP modernization
- News section uses `#news-list` (same ID, `script.js` handles path)
- Contact section: email avhrst@gmail.com
- Nav links in English: "About Migration", "Q&A", "Market Monitoring", "News", "Contact"

**Step 3: Verify English page**

Run: `python3 -m http.server 8000`
Open: `http://localhost:8000/en/` — full English page should render with correct styles, news should load (will fail until Task 4).

**Step 4: Commit**

```bash
git add en/index.html
git commit -m "feat: add English version of the site"
```

---

### Task 4: Create English news file `en/news.json`

**Files:**
- Create: `en/news.json`

**Step 1: Create `en/news.json`**

```json
[
  {
    "date": "2026-03-08",
    "title": "Oracle APEX 24.2: Built-in AI Assistant for App Development",
    "summary": "The 24.2 release strengthens AI capabilities in APEX: SQL/PLSQL code suggestions, rapid UI component creation, and native LLM integration for business assistants.",
    "tag": "Oracle APEX"
  },
  {
    "date": "2026-03-08",
    "title": "OCI Expands AI Services for Enterprise Integrations",
    "summary": "Oracle Cloud Infrastructure added new managed AI services for document processing and customer support automation, simplifying AI integration in APEX applications via API.",
    "tag": "OCI"
  },
  {
    "date": "2026-03-07",
    "title": "Growing Demand for Legacy ERP Replacement Solutions",
    "summary": "Market reports show increasing demand for secure, web-native ERP and accounting solutions. Companies are focusing on cloud architectures and phased migration strategies.",
    "tag": "Market"
  },
  {
    "date": "2026-03-06",
    "title": "APEX + AI Accelerates Business Application Time-to-Market",
    "summary": "Implementation experience shows that Oracle APEX low-code approach combined with AI automation speeds up MVP launches and reduces development team workload.",
    "tag": "AI"
  }
]
```

**Step 2: Verify news loads on English page**

Open: `http://localhost:8000/en/` — news cards should now render with English content.

**Step 3: Commit**

```bash
git add en/news.json
git commit -m "feat: add English news.json"
```

---

### Task 5: Update `sitemap.xml` and `CLAUDE.md`

**Files:**
- Modify: `sitemap.xml`
- Modify: `CLAUDE.md`

**Step 1: Add English URL to `sitemap.xml`**

Add before `</urlset>`:

```xml
  <url>
    <loc>https://apex.rest/en/</loc>
    <lastmod>2026-03-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
```

**Step 2: Update `CLAUDE.md`**

Add a note about the multilanguage structure in the Architecture section — mention `en/` subfolder, how language detection works, and that English content is adapted (not a literal translation).

**Step 3: Commit**

```bash
git add sitemap.xml CLAUDE.md
git commit -m "feat: update sitemap and docs for multilanguage support"
```

---

### Task 6: End-to-end verification

**Step 1: Verify UA page**
- Open `http://localhost:8000/` — Ukrainian content, news loads, nav works, lang switcher shows UA active + EN link
- Click EN → navigates to `/en/`, `localStorage.lang` is set to `en`

**Step 2: Verify EN page**
- Open `http://localhost:8000/en/` — English content, news loads from `en/news.json`, nav works, lang switcher shows EN active + UA link
- Click UA → navigates to `/`, `localStorage.lang` is set to `uk`

**Step 3: Verify auto-redirect**
- Clear `localStorage` in DevTools
- Set browser language to English (or use Chrome DevTools > Sensors > Language)
- Navigate to `http://localhost:8000/` → should redirect to `/en/`
- Clear `localStorage`, set browser language to Ukrainian → should stay on `/`

**Step 4: Verify SEO elements**
- Both pages have correct `<html lang>`, `<title>`, `<meta description>`, OG tags
- Both pages have matching `hreflang` alternate links
- JSON-LD is in the correct language on each page
- `sitemap.xml` has both URLs

**Step 5: Check mobile responsive**
- Both pages render correctly at 768px and below
- Language switcher is accessible in mobile nav
