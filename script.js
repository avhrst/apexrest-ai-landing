document.addEventListener('DOMContentLoaded', () => {
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

  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  fetch('news.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Не вдалося завантажити новини');
      return response.json();
    })
    .then(news => {
      const items = Array.isArray(news) ? news.slice(0, 4) : [];
      if (!items.length) {
        newsList.innerHTML = '<p class="news-fallback">Поки що немає новин для відображення.</p>';
        return;
      }

      newsList.innerHTML = items
        .map(item => `
          <article class="news-card">
            <div class="news-meta">
              <span class="news-tag">${item.tag || 'Оновлення'}</span>
              <time datetime="${item.date}">${item.date}</time>
            </div>
            <h3>${item.title || ''}</h3>
            <p>${item.summary || ''}</p>
          </article>
        `)
        .join('');
    })
    .catch(() => {
      newsList.innerHTML = '<p class="news-fallback">Не вдалося завантажити новини. Спробуйте оновити сторінку.</p>';
    });
});
