document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const isMobile = window.innerWidth < 820;

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

      document.querySelectorAll('.qa-card.open').forEach(other => {
        if (other !== card) other.classList.remove('open');
      });

      card.classList.toggle('open');
    });
  });

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
  }, { threshold: 0.08 });

  function observeWithStagger(selector, revealClass) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(revealClass || 'animate-on-scroll');
      el.style.transitionDelay = (i * 0.08) + 's';
      scrollObserver.observe(el);
    });
  }

  // Section headers get blur reveal
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal-blur');
    scrollObserver.observe(el);
  });

  // Hero panels get slide reveals
  const heroCopy = document.querySelector('.hero-copy');
  const heroSidebar = document.querySelector('.hero-sidebar');
  if (heroCopy) {
    heroCopy.classList.add('reveal-slide-left');
    scrollObserver.observe(heroCopy);
  }
  if (heroSidebar) {
    heroSidebar.classList.add('reveal-slide-right');
    scrollObserver.observe(heroSidebar);
  }

  // Cards get scale reveal
  observeWithStagger('.qa-card', 'reveal-scale');
  observeWithStagger('.monitor-card', 'reveal-scale');
  observeWithStagger('.overview-card', 'reveal-scale');
  observeWithStagger('.solution-card', 'reveal-scale');

  // Article and video sections
  document.querySelectorAll('.article-video, .article-infographic, .article-content, .article-links').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });

  document.querySelectorAll('.video-container, .opensource-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });

  document.querySelectorAll('.cta').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });

  // --- Hero Particles (canvas) ---
  if (!prefersReducedMotion) {
    const canvas = document.getElementById('hero-particles');
    const hero = document.getElementById('hero-section');
    if (canvas && hero) {
      const ctx = canvas.getContext('2d');
      const particleCount = isMobile ? 20 : 45;
      let particles = [];
      let animFrame;
      let heroVisible = true;

      function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
      }
      resizeCanvas();

      function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.8 + 0.8
          });
        }
      }
      createParticles();

      function drawParticles() {
        if (!heroVisible || document.hidden) {
          animFrame = requestAnimationFrame(drawParticles);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(199,70,52,0.35)';
          ctx.fill();

          // Connection lines
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = dx * dx + dy * dy;
            if (dist < 14400) { // 120px squared
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = 'rgba(199,70,52,' + (0.08 * (1 - dist / 14400)) + ')';
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
        animFrame = requestAnimationFrame(drawParticles);
      }
      drawParticles();

      // Pause when hero offscreen
      const heroObserver = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
      }, { threshold: 0 });
      heroObserver.observe(hero);

      window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
      });

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && heroVisible) {
          cancelAnimationFrame(animFrame);
          drawParticles();
        }
      });
    }
  }

  // --- Hero Mouse-following Glow ---
  if (!prefersReducedMotion && hasHover) {
    const hero = document.getElementById('hero-section');
    const glow = hero && hero.querySelector('.hero-glow');
    if (hero && glow) {
      let glowFrame;
      hero.addEventListener('mousemove', (e) => {
        if (glowFrame) return;
        glowFrame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
          const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
          glow.style.setProperty('--mouse-x', x + '%');
          glow.style.setProperty('--mouse-y', y + '%');
          glowFrame = null;
        });
      });
      hero.addEventListener('mouseleave', () => {
        glow.style.setProperty('--mouse-x', '50%');
        glow.style.setProperty('--mouse-y', '50%');
      });
    }
  }

  // --- Stat Counter Animation ---
  const countElements = document.querySelectorAll('[data-count-target]');
  if (countElements.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.countTarget, 10);
        const suffix = el.dataset.countSuffix || '';
        if (isNaN(target)) return;

        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (t < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
            el.classList.add('stat-counted');
          }
        }

        if (prefersReducedMotion) {
          el.textContent = target + suffix;
        } else {
          el.textContent = '0' + suffix;
          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));
  }

  // --- Terminal Typing Effect ---
  if (!prefersReducedMotion) {
    const terminal = document.querySelector('.fake-terminal');
    if (terminal) {
      const lines = terminal.querySelectorAll('.terminal-line');
      lines.forEach(line => line.classList.add('terminal-hidden'));

      const termObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        termObserver.disconnect();

        lines.forEach((line, i) => {
          setTimeout(() => {
            line.classList.remove('terminal-hidden');
            line.classList.add('terminal-typing');
          }, i * 600);
        });
      }, { threshold: 0.3 });

      termObserver.observe(terminal);
    }
  }

  // --- Card Tilt + Glow Micro-interactions ---
  if (!prefersReducedMotion && hasHover) {
    const tiltCards = document.querySelectorAll('.overview-card, .solution-card, .monitor-card, .sidebar-card');
    tiltCards.forEach(card => {
      card.classList.add('tilt-card');
      card.style.position = card.style.position || 'relative';
      card.style.overflow = 'hidden';
      const glowDiv = document.createElement('div');
      glowDiv.className = 'tilt-glow';
      card.appendChild(glowDiv);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const xTilt = (dx / (rect.width / 2)) * 3;
        const yTilt = -(dy / (rect.height / 2)) * 3;

        card.style.transform = 'perspective(800px) rotateX(' + yTilt.toFixed(2) + 'deg) rotateY(' + xTilt.toFixed(2) + 'deg) translateY(-2px)';
        const gx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const gy = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        glowDiv.style.setProperty('--glow-x', gx + '%');
        glowDiv.style.setProperty('--glow-y', gy + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --- Parallax on Hero ---
  if (!prefersReducedMotion && !isMobile) {
    const heroCopy = document.querySelector('.hero-copy');
    let parallaxTicking = false;

    window.addEventListener('scroll', () => {
      if (parallaxTicking) return;
      parallaxTicking = true;
      requestAnimationFrame(() => {
        if (heroCopy) {
          const scrollY = window.scrollY;
          heroCopy.style.setProperty('--parallax-y', (scrollY * 0.12) + 'px');
        }
        parallaxTicking = false;
      });
    }, { passive: true });
  }

  // --- Active Nav Highlighting (scroll spy) ---
  const spySections = ['video', 'deterministic-vibe-coding', 'seo-intent', 'qa', 'monitoring', 'solutions', 'news', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function updateActiveNav() {
    let currentId = '';
    for (const section of spySections) {
      const rect = section.getBoundingClientRect();
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

  // Unified scroll handler
  window.addEventListener('scroll', () => {
    updateActiveNav();
    updateHeaderScroll();
  }, { passive: true });

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

      observeWithStagger('.news-card', 'reveal-scale');
    })
    .catch(() => {
      newsList.innerHTML = '<p class="news-fallback">' + fallbackError + '</p>';
    });
});
