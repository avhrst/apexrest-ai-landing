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
  document.querySelectorAll('.toolbar-lang a[data-lang]').forEach(link => {
    link.addEventListener('click', () => {
      localStorage.setItem('lang', link.dataset.lang);
    });
  });

  // --- Mobile sidebar toggle ---
  const toggle = document.querySelector('.toolbar-toggle');
  const sidebar = document.getElementById('builder-sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.textContent = '\u2630';
  }

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active', isOpen);
      toggle.textContent = isOpen ? '\u2715' : '\u2630';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // --- Tree navigation: highlight active item on click ---
  const contentScroll = document.querySelector('.content-scroll');
  const treeItems = document.querySelectorAll('.tree-item[href]');

  treeItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove active from all
      document.querySelectorAll('.tree-item').forEach(t => t.classList.remove('active'));
      // Set active on clicked
      item.classList.add('active');

      // Smooth scroll to target in content pane
      const targetId = item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target && contentScroll) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close sidebar on mobile
          if (window.innerWidth <= 768) {
            closeSidebar();
          }
        }
      }
    });
  });

  // --- Highlight tree item on scroll (intersection observer) ---
  if (contentScroll && treeItems.length > 0) {
    const sectionIds = [];
    treeItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        sectionIds.push(href.slice(1));
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.tree-item').forEach(t => t.classList.remove('active'));
          const matchingItem = document.querySelector(`.tree-item[href="#${id}"]`);
          if (matchingItem) {
            matchingItem.classList.add('active');
            // Scroll tree item into view if needed
            matchingItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }, {
      root: contentScroll,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
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
