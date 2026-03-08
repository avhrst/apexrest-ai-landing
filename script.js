document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle) {
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

  // Load news from news.json
  loadNews();
});

async function loadNews() {
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  try {
    const response = await fetch('news.json');
    const news = await response.json();
    grid.innerHTML = news.map(item => {
      const tagClass = item.tag === 'AI' ? 'ai' : 'apex';
      return `
        <article class="news-card">
          <div class="news-meta">
            <span class="news-date">${item.date}</span>
            <span class="news-tag ${tagClass}">${item.tag}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </article>
      `;
    }).join('');
  } catch {
    grid.innerHTML = '<p style="color:var(--color-text-muted)">Не вдалося завантажити новини.</p>';
  }
}
