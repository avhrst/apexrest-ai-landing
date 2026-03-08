# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Static site — no build step, no frameworks, no package manager.

**Local server:** open `index.html` directly or use any static server:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
A local server is needed for `news.json` fetch to work (blocked by CORS on `file://`).

**No linter/tests configured.** Validate HTML manually if needed.

**Deployment:** hosted at https://apex.rest/ — repo is `git@github.com:avhrst/apexrest-ai-landing.git`, branch `main`.

## Architecture

Single-page static site with 6 files:

| File | Purpose |
|------|---------|
| `index.html` | Entire page: header, AI banner, hero, SEO intent block, Q&A, monitoring, news, contacts, footer. Contains JSON-LD structured data (FAQPage + Organization). |
| `style.css` | All styles. CSS custom properties in `:root` define the theme. Responsive breakpoint at 768px. |
| `script.js` | Two features: mobile nav toggle and dynamic news section (fetches `news.json`, renders up to 4 cards into `#news-list`). |
| `news.json` | Array of news items `{date, title, summary, tag}`. Loaded at runtime by `script.js`. To add news, prepend items here (only first 4 are shown). |
| `en/index.html` | English version of the site. References shared assets via `../`. Adapted content (not literal translation). |
| `en/news.json` | English news items. Same structure as `news.json`, loaded when page is under `/en/`. |
| `robots.txt` | Allows all crawlers, points to sitemap. |
| `sitemap.xml` | URL entries for `https://apex.rest/` and `https://apex.rest/en/`. Update `<lastmod>` when content changes. |

### CSS Theme (`:root` variables)
- `--color-bg: #0a0e1a` — dark graphite background
- `--color-primary: #c74634` / `--color-primary-light: #ef6b5a` — Oracle-red accents
- `--color-surface` / `--color-surface-2` — card backgrounds
- `--max-width: 860px` — content container width (header uses 1200px)

### HTML Section IDs
`#seo-intent`, `#qa`, `#monitoring`, `#news`, `#contact` — used by nav links and defined in `index.html`.

### Multilanguage (EN/UA)
- Ukrainian: `/index.html` (default), English: `/en/index.html`
- Shared assets: `style.css`, `script.js` (EN page references via `../`)
- `script.js` auto-detects browser language on first visit; non-Ukrainian browsers redirect to `/en/`
- Language preference saved in `localStorage('lang')`, overrides auto-detection
- Language switcher in header nav (`.lang-switch` with `data-lang` attributes)
- English content is adapted for international audience, not a literal translation
- News: `news.json` (UA) and `en/news.json` (EN) — loaded dynamically based on page location

---

## Проєкт
Статичний сайт для компанії **APEXREST** у форматі **блогу-аналітики**.

## Позиціонування
APEXREST спеціалізується на:
- Oracle APEX
- AI автоматизації бізнес-процесів
- Міграції з 1С/подібних систем на сучасну безпечну архітектуру

## Поточний формат сайту (обов'язково)
1. Великий AI-банер: сайт створюється та адмініструється AI-ботом.
2. Hero з фокусом на тему: **чому Oracle APEX може замінити 1С**.
3. Перший основний контентний блок: **Q&A** (питання-відповіді) про заміну 1С.
4. Окремий блок: **моніторинг ринку** (хто шукає заміну 1С) з коментарями APEXREST.
5. Блок рішень/послуг APEXREST.
6. Контакти: **тільки email avhrst@gmail.com** (без форми зворотного зв'язку).

## Правила для контенту моніторингу
- Для кожного кейсу обов'язково вказувати:
  - що саме шукає компанія/ринок,
  - коментар APEXREST: чому Oracle APEX підходить,
  - оригінальне посилання на джерело.
- Якщо джерело із соцмереж (Facebook/LinkedIn) і доступ обмежений — додавати коротку примітку про обмеження прев'ю.
- Не вигадувати факти; при невизначеності формулювати обережно.

## Оновлення
- Сайт планується оновлювати регулярно (щоденні/часті апдейти блогу та моніторингу).
- Мова контенту: українська.
- Стек: чисті HTML/CSS/JS (без фреймворків).

## Фіксований стиль для наступних оновлень (ВАЖЛИВО)
Останній варіант дизайну вважається еталоном. У наступних апдейтах потрібно зберігати той самий візуальний рівень, структуру та обсяг контенту.

### 1) Візуальний стиль
- Напрям: **Oracle APEX enterprise style**.
- Палітра: темний графітовий фон + червоні акценти Oracle-like.
- Атмосфера: професійна, технологічна, без «кричущого» маркетингового шуму.
- Картки, блоки, бордери, контраст, типографіка — на рівні поточного production-варіанту.
- Зберігати великий AI-банер у верхній частині сайту.

### 2) Макет і щільність контенту
- Формат: блог-аналітика, не класичний короткий лендінг.
- Обсяг: **не спрощувати**. Наступні версії мають бути приблизно такого ж масштабу, як поточна.
- Обов'язкові блоки:
  1. Hero
  2. Великий Q&A блок
  3. Моніторинг ринку з кейсами
  4. Блок рішень APEXREST
  5. Простий контактний блок (тільки email)

### 3) Вимоги до Q&A (обсяг)
- Мінімум 8 повноцінних питань/відповідей.
- Кожна відповідь: практична, предметна, без води.
- Теми: міграція даних, облік, кастомізація, інтеграції, безпека, TCO, строки запуску, ризики.

### 4) Вимоги до блоку моніторингу (обсяг)
- Мінімум 6–8 кейсів/публікацій.
- Для кожного кейсу обов'язково:
  - що саме шукає ринок/компанія,
  - коментар APEXREST: чому Oracle APEX підходить,
  - оригінальне посилання.
- Якщо соцмережевий пост має обмежений доступ — додавати коротку примітку.

### 5) Якість тексту
- Українська мова, діловий і зрозумілий тон.
- Не вигадувати факти; за невизначеності — обережні формулювання.
- Кожен блок має давати практичну цінність для бізнес-аудиторії.

### 6) Що не можна робити
- Не зменшувати обсяг до «короткого лендингу».
- Не повертати форму зворотного зв'язку (контакт — тільки email, якщо не буде окремого нового запиту).
- Не відходити від Oracle APEX visual style без прямої команди.
