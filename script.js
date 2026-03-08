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
