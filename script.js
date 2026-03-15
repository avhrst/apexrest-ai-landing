document.addEventListener('DOMContentLoaded', () => {
  // --- Language auto-redirect ---
  const isEnPage = location.pathname.startsWith('/en');
  const savedLang = localStorage.getItem('lang');

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
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');

  function closeNav() {
    if (nav) nav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.innerHTML = '&#9776;';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active', isOpen);
      toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close mobile nav on link click
  if (nav) {
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // --- Q&A accordion ---
  document.querySelectorAll('.qa-question').forEach(question => {
    question.addEventListener('click', () => {
      const card = question.closest('.qa-card');
      if (!card) return;

      // Close other cards
      document.querySelectorAll('.qa-card.open').forEach(other => {
        if (other !== card) other.classList.remove('open');
      });

      card.classList.toggle('open');
    });
  });

  // Open first Q&A by default
  const firstQA = document.querySelector('.qa-card');
  if (firstQA) firstQA.classList.add('open');

  // --- News loading ---
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
        newsList.innerHTML = '<p class="news-fallback">' + fallbackEmpty + '</p>';
        return;
      }

      newsList.innerHTML = items
        .map(item =>
          '<article class="news-card">' +
            '<div class="news-meta">' +
              '<span class="news-tag">' + (item.tag || defaultTag) + '</span>' +
              '<time datetime="' + item.date + '">' + item.date + '</time>' +
            '</div>' +
            '<h3>' + (item.title || '') + '</h3>' +
            '<p>' + (item.summary || '') + '</p>' +
          '</article>'
        )
        .join('');
    })
    .catch(() => {
      newsList.innerHTML = '<p class="news-fallback">' + fallbackError + '</p>';
    });
});
