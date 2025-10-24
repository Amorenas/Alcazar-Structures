// Año dinámico + navegación + tema persistente
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Tema (oscuro/claro/auto) con persistencia
  const btnTheme = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  function applySavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
    else root.setAttribute('data-theme', 'auto');
  }
  applySavedTheme();
  if (btnTheme) btnTheme.title = `Tema: ${root.getAttribute('data-theme') || 'auto'}`;

  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'auto';
      const next = current === 'auto' ? 'dark' : current === 'dark' ? 'light' : 'auto';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btnTheme.title = `Tema: ${next}`;
    });
  }
});
