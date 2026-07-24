// Tia Maria — interações de UI (menu mobile, submenus, busca, tabs, modais)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });
  }

  // Submenu (Kits Festa) abre/fecha ao clicar na seta — funciona igual em desktop e mobile
  document.querySelectorAll('.has-sub').forEach((li) => {
    const chevronBtn = li.querySelector('.nav-chevron-btn');
    if (!chevronBtn) return;
    chevronBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = li.classList.toggle('open');
      chevronBtn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  function closeAllSubmenus() {
    document.querySelectorAll('.has-sub.open').forEach((li) => {
      li.classList.remove('open');
      const chevronBtn = li.querySelector('.nav-chevron-btn');
      if (chevronBtn) chevronBtn.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-sub.open').forEach((li) => {
      if (!li.contains(e.target)) closeAllSubmenus();
    });
  });

  // Header ganha sombra ao rolar
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  // Tabs genéricas (usadas no seletor de bolos: tipo / massa)
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll(`[data-tab-panel="${group.dataset.tabs}"]`);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach((p) => {
          p.hidden = p.dataset.tabValue !== btn.dataset.tabValue;
        });
      });
    });
  });

  // ---------- Busca ----------
  const searchToggle = document.querySelector('.search-toggle');
  const searchPanel = document.querySelector('.search-panel');
  const searchInput = document.querySelector('.search-panel input');
  const searchResults = document.querySelector('.search-results');

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      searchPanel.classList.toggle('is-open');
      if (searchPanel.classList.contains('is-open')) searchInput.focus();
    });
    document.addEventListener('click', (e) => {
      if (!searchPanel.contains(e.target) && !searchToggle.contains(e.target)) {
        searchPanel.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchPanel.classList.remove('is-open');
    });
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const data = window.TIAMARIA_SEARCH || [];
    const q = query.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }
    const matches = data.filter((item) => item.nome.toLowerCase().includes(q)).slice(0, 12);
    if (!matches.length) {
      searchResults.innerHTML = `<div class="search-empty">Nada encontrado para "${query}". Tente outro termo ou fale no WhatsApp.</div>`;
      return;
    }
    searchResults.innerHTML = matches.map((m) => `
      <a href="${m.url}"><span>${m.nome}</span><span class="cat">${m.cat}</span></a>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  }

  // ---------- Modais genéricos (fecha ao clicar fora ou Esc) ----------
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.hidden = true;
    });
    const closeBtn = backdrop.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => { backdrop.hidden = true; });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-backdrop:not([hidden])').forEach((b) => { b.hidden = true; });
    document.querySelectorAll('.lightbox:not([hidden])').forEach((b) => { b.hidden = true; });
    closeAllSubmenus();
  });

  // ---------- Highlight ao chegar via âncora (ex: busca ou link direto) ----------
  if (window.location.hash) {
    try {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.add('highlight-pulse');
          setTimeout(() => target.classList.remove('highlight-pulse'), 3200);
        }, 300);
      }
    } catch (err) { /* hash inválido como seletor - ignora */ }
  }
});
