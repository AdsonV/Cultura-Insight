document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  const explorarBtn = document.getElementById("explorarBtn");
  const explorarMenu = document.getElementById("explorarMenu");
  const generosDropdown = document.getElementById('generos-dropdown');
  const generosBtn = document.getElementById('generosBtn');
  const generosList = document.getElementById('generosList');
  const anoRange = document.getElementById('anoRange');
  const anoValor = document.getElementById('anoValor');
  const ratingStars = document.querySelectorAll('#ratingFilter .star');
  const ratingLabel = document.getElementById('ratingLabel');
  const aplicarBtn = document.getElementById('aplicarFiltrosBtn');
  const limparBtn = document.getElementById('limparFiltrosBtn');
  const resultadoTitulo = document.getElementById('resultadoTitulo');
  const resultadoDescricao = document.getElementById('resultadoDescricao');
  const mediaTypeButtons = document.querySelectorAll('#mediaTypeButtons button');

  let ratingMin = 0;
  let selectedMediaType = 'Filme';

  const todosGeneros = {
    Filme: ["Ação & Aventura", "Comédia", "Drama", "Ficção Científica", "Suspense", "Terror", "Faroeste", "Crime", "Noir", "Cinebiografia", "Fantasia", "Animação"],
    Livro: ["Romance", "Ficção", "Biografia", "Fantasia", "Terror","Desenvolvimento Pessoal", "Ensaio", "Infantil"],
    Album: ["Rock", "Pop", "Hip-Hop", "Jazz","Blues","Erudita","Samba","MPB", "Sertanejo", "Eletrônica", "Funk"]
  };

  function atualizarGeneros(tipoSelecionado) {
    if (!generosList) return;
    generosList.innerHTML = '';

    if (todosGeneros[tipoSelecionado]) {
      todosGeneros[tipoSelecionado].forEach((genero, i) => {
        const li = document.createElement('li');
        const id = `genero-${tipoSelecionado.toLowerCase()}-${i}`;
        li.innerHTML = `
          <input type="checkbox" id="${id}" name="generos" value="${genero}" />
          <label for="${id}">${genero}</label>
        `;
        generosList.appendChild(li);
      });
    }
  }

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    });
  }

  function fecharSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  if (closeSidebar) closeSidebar.addEventListener('click', fecharSidebar);
  if (overlay) overlay.addEventListener('click', fecharSidebar);

  if (explorarBtn && explorarMenu) {
    explorarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = explorarBtn.getAttribute('aria-expanded') === 'true';
      explorarBtn.setAttribute('aria-expanded', !expanded);
      explorarMenu.classList.toggle('show');
    });
  }

  document.addEventListener('click', (e) => {
    if (explorarBtn && explorarMenu) {
      if (!explorarBtn.contains(e.target) && !explorarMenu.contains(e.target)) {
        explorarMenu.classList.remove('show');
        explorarBtn.setAttribute('aria-expanded', 'false');
      }
    }

    if (generosDropdown && generosList) {
      if (!generosDropdown.contains(e.target) && generosList.classList.contains('show')) {
        generosList.classList.remove('show');
        generosBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (generosBtn && generosList) {
    generosBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShown = generosList.classList.toggle('show');
      generosBtn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
    });
  }

  if (anoRange && anoValor) {
    anoRange.addEventListener('input', () => {
      anoValor.textContent = anoRange.value;
    });
  }

  function setRating(min) {
    ratingMin = min;
    if (ratingLabel) ratingLabel.textContent = min > 0 ? `${min.toFixed(1)}+` : '0.0+';
    ratingStars.forEach((star) => {
      const starValue = parseInt(star.dataset.value, 10);
      if (starValue <= min) {
        star.classList.add('active');
        star.setAttribute('aria-checked', 'true');
        star.setAttribute('tabindex', '0');
      } else {
        star.classList.remove('active');
        star.setAttribute('aria-checked', 'false');
        star.setAttribute('tabindex', '-1');
      }
    });
  }

  ratingStars.forEach(star => {
    star.addEventListener('click', () => setRating(parseInt(star.dataset.value)));
    star.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setRating(parseInt(star.dataset.value));
      }
    });
  });

  function getCheckedGeneros() {
    return Array.from(document.querySelectorAll('input[name="generos"]:checked')).map(el => el.value);
  }

  if (aplicarBtn) {
    aplicarBtn.addEventListener('click', () => {
      const tipoObraEl = document.getElementById('tipoObra');
      const tipoObra = tipoObraEl ? tipoObraEl.value : selectedMediaType;
      const generosSelecionados = getCheckedGeneros();
      const anoMax = anoRange ? parseInt(anoRange.value) : 'N/A';
      const avaliacaoMin = ratingMin;

      let texto = `Filtrando avaliações de tipo "${tipoObra}", gêneros: ${
        generosSelecionados.length > 0 ? generosSelecionados.join(', ') : 'Todos'
      }, até o ano ${anoMax}, avaliação mínima ${avaliacaoMin.toFixed(1)}+.`;

      if (resultadoTitulo) resultadoTitulo.textContent = "Filtros aplicados";
      if (resultadoDescricao) resultadoDescricao.textContent = texto;

      fecharSidebar();
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener('click', () => {
      const tipoObraEl = document.getElementById('tipoObra');
      if (tipoObraEl) tipoObraEl.value = 'todos';

      document.querySelectorAll('input[name="generos"]').forEach(cb => cb.checked = false);

      if (anoRange) {
        anoRange.value = anoRange.max;
        if (anoValor) anoValor.textContent = anoRange.value;
      }

      setRating(0);

      if (resultadoTitulo) resultadoTitulo.textContent = "Nenhuma avaliação encontrada";
      if (resultadoDescricao) resultadoDescricao.textContent = "Use os filtros para encontrar avaliações ou faça uma busca acima.";

      fecharSidebar();
    });
  }

  mediaTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      mediaTypeButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');

      selectedMediaType = button.getAttribute('data-type');

      atualizarGeneros(selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1));
    });
  });

  atualizarGeneros('Filme');
  setRating(0);
});
