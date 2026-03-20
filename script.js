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

  // --- Scroll Animation (Intersection Observer) ---
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  /**
   * Adds animate-on-scroll class and staggered delay to a list of elements,
   * then starts observing them.
   */
  function observeWithStagger(selector) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('animate-on-scroll', 'animate-delay-' + (i % 3 + 1));
      scrollObserver.observe(el);
    });
  }

  // Observe static elements
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });

  observeWithStagger('.qa-card');
  observeWithStagger('.monitor-card');

  // Observe the CTA / contact section
  document.querySelectorAll('.cta').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });

  // --- Active Nav Highlighting (scroll spy) ---
  const spySections = ['qa', 'monitoring', 'news', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function updateActiveNav() {
    // Find which section is currently in view
    let currentId = '';
    for (const section of spySections) {
      const rect = section.getBoundingClientRect();
      // Section is "active" when its top is above the midpoint of the viewport
      if (rect.top <= window.innerHeight / 2) {
        currentId = section.id;
      }
    }

    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- Header Scroll Effect ---
  const siteHeader = document.querySelector('.site-header');

  function updateHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  // Unified scroll handler for nav highlighting and header effect
  window.addEventListener('scroll', () => {
    updateActiveNav();
    updateHeaderScroll();
  }, { passive: true });

  // Run once on load in case the page is already scrolled
  updateActiveNav();
  updateHeaderScroll();

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
            (item.sourceUrl ? '<p class="news-source"><a href="' + item.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + (item.sourceName || 'Source') + '</a></p>' : '') +
          '</article>'
        )
        .join('');

      // Observe dynamically created news cards for scroll animation
      observeWithStagger('.news-card');
    })
    .catch(() => {
      newsList.innerHTML = '<p class="news-fallback">' + fallbackError + '</p>';
    });
});
