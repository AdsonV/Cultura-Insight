document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  const explorarBtn = document.getElementById("explorarBtn");
  const explorarMenu = document.getElementById("explorarMenu");
  const generosDropdown = document.getElementById("generos-dropdown");
  const generosBtn = document.getElementById("generosBtn");
  const generosList = document.getElementById("generosList");
  const anoRange = document.getElementById("anoRange");
  const anoValor = document.getElementById("anoValor");
  const ratingStars = document.querySelectorAll('#ratingFilter .star');
  const ratingLabel = document.getElementById('ratingLabel');
  const aplicarBtn = document.getElementById('aplicarFiltrosBtn');
  const limparBtn = document.getElementById('limparFiltrosBtn');
  const resultadoTitulo = document.getElementById('resultadoTitulo');
  const resultadoDescricao = document.getElementById('resultadoDescricao');
  const resultadoLista = document.getElementById('resultadoLista');
  const mediaTypeButtons = document.querySelectorAll('#mediaTypeButtons button');

  let ratingMin = 0;
  let selectedMediaType = 'Filme';

  const todosGeneros = {
    Filme: ["Ação & Aventura", "Comédia", "Drama", "Ficção Científica", "Suspense", "Terror", "Faroeste", "Crime", "Noir", "Cinebiografia", "Fantasia", "Animação"],
    Livro: ["Romance", "Ficção", "Biografia", "Fantasia", "Terror", "Desenvolvimento Pessoal", "Ensaio", "Infantil"],
    Album: ["Rock", "Pop", "Hip-Hop", "Jazz", "Blues", "Erudita", "Samba", "MPB", "Sertanejo", "Eletrônica", "Funk"]
  };

  function abrirSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('active');
  }

  function fecharSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  }

  menuBtn?.addEventListener('click', abrirSidebar);
  closeSidebar?.addEventListener('click', fecharSidebar);
  overlay?.addEventListener('click', fecharSidebar);

  explorarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = explorarBtn.getAttribute('aria-expanded') === 'true';
    explorarBtn.setAttribute('aria-expanded', !expanded);
    explorarMenu?.classList.toggle('show');

    if (!explorarBtn.contains(e.target) && !explorarMenu.contains(e.target)) {
      explorarMenu?.classList.remove('show');
      explorarBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (e) => {

    function setRating(min) {
      ratingMin = min;
      ratingLabel.textContent = `${min.toFixed(1)}+`;
      ratingStars.forEach((star) => {
        const starValue = parseInt(star.dataset.value, 10);
        const isActive = starValue <= min;
        star.classList.toggle('active', isActive);
        star.setAttribute('aria-checked', isActive);
        star.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    }

    ratingStars.forEach((star) => {
      const value = parseInt(star.dataset.value);
      star.addEventListener('click', () => setRating(value));
      star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setRating(value);
        }
      });
    });

    anoRange?.addEventListener('input', () => {
      anoValor.textContent = anoRange.value;
    });

    if (!generosDropdown.contains(e.target) && generosList.classList.contains('show')) {
      generosList.classList.remove('show');
      generosBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  generosBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShown = generosList.classList.toggle('show');
    generosBtn.setAttribute('aria-expanded', isShown);
  });

  function atualizarGeneros(tipoSelecionado) {
    generosList.innerHTML = '';
    if (!todosGeneros[tipoSelecionado]) return;

    todosGeneros[tipoSelecionado].forEach((genero, index) => {
      const id = `genero-${tipoSelecionado.toLowerCase()}-${index}`;
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" id="${id}" name="generos" value="${genero}" />
        <label for="${id}">${genero}</label>
      `;
      generosList.appendChild(li);
    });
  }

  function getCheckedGeneros() {
    return Array.from(document.querySelectorAll('input[name="generos"]:checked')).map(cb => cb.value);
  }

  mediaTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      mediaTypeButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');

      selectedMediaType = button.dataset.type;
      atualizarGeneros(selectedMediaType.charAt(0).toUpperCase() + selectedMediaType.slice(1));
    });
  });

  aplicarBtn?.addEventListener('click', () => {
    fecharSidebar();
  });

  limparBtn?.addEventListener('click', () => {
    mediaTypeButtons.forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
    });

    selectedMediaType = 'Filme';
    mediaTypeButtons.forEach(btn => {
      if (btn.dataset.type === 'filme') {
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      }
    });

    document.querySelectorAll('input[name="generos"]').forEach(cb => cb.checked = false);

    if (anoRange) {
      anoRange.value = anoRange.max;
      anoValor.textContent = anoRange.value;
    } 

    setRating(0);
    atualizarGeneros(selectedMediaType);
    resultadoTitulo.textContent = "Nenhuma avaliação encontrada";
    resultadoDescricao.textContent = "Use os filtros para encontrar avaliações ou faça uma busca acima.";
    resultadoLista.innerHTML = '';
    fecharSidebar();
  });

  atualizarGeneros('Filme');
  setRating(0);
});