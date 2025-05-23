document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('closeSidebar');
  const overlay = document.getElementById('overlay');
  const explorarBtn = document.getElementById("explorarBtn");
  const explorarMenu = document.getElementById("explorarMenu");
  const generosBtn = document.getElementById("generosBtn");
  const generosList = document.getElementById("generosList");
  const anoRange = document.getElementById("anoRange");
  const anoValor = document.getElementById("anoValor");
  const generosDropdown = document.getElementById('generos-dropdown');
  const mediaTypeButtons = document.querySelectorAll('#mediaTypeButtons button');
  const aplicarBtn = document.getElementById('aplicarFiltrosBtn');
  const limparBtn = document.getElementById('limparFiltrosBtn');
  const ordenacaoSelect = document.getElementById('ordenacaoSelect');


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
    atualizarGeneros(selectedMediaType);
    resultadoTitulo.textContent = "Nenhuma avaliação encontrada";
    resultadoDescricao.textContent = "Use os filtros para encontrar avaliações ou faça uma busca acima.";
    resultadoLista.innerHTML = '';
    fecharSidebar();
  });

  atualizarGeneros('Filme');

  const chartConfigs = [
    { id: 'graficoObrasCategoria', type: 'bar' },
    { id: 'graficoNotasDistribuidas', type: 'pie' },
    { id: 'graficoAvaliacoesPorData', type: 'line' },
    { id: 'graficoFavoritos', type: 'doughnut' },
    { id: 'graficoTopObras', type: 'bar' },
    { id: 'graficoFavoritosPorGenero', type: 'bar' }
  ];

  chartConfigs.forEach(cfg => {
    const ctx = document.getElementById(cfg.id);
    if (ctx) {
      charts[cfg.id] = new Chart(ctx, {
        type: cfg.type,
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      });
    }
  });

  mediaTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      mediaTypeButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      selectedMediaType = button.dataset.type.charAt(0).toUpperCase() + button.dataset.type.slice(1);
    });
  });

  anoRange?.addEventListener('input', () => {
    anoValor.textContent = anoRange.value;
  });

  aplicarBtn?.addEventListener('click', () => {
    const filtros = {
      tipo: selectedMediaType,
      ano: anoRange?.value,
      ordenacao: ordenacaoSelect?.value,
      generos: Array.from(document.querySelectorAll('input[name="generos"]:checked')).map(cb => cb.value)
    };

    carregarDados(filtros);
  });

  limparBtn?.addEventListener('click', () => {
    anoRange.value = anoRange.max;
    anoValor.textContent = anoRange.value;
    ordenacaoSelect.selectedIndex = 0;

    document.querySelectorAll('input[name="generos"]').forEach(cb => cb.checked = false);

    selectedMediaType = 'Filme';
    mediaTypeButtons.forEach(btn => {
      if (btn.dataset.type === 'filme') {
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    limparGraficos();
  });

  function limparGraficos() {
    Object.values(charts).forEach(chart => {
      chart.data.labels = [];
      chart.data.datasets = [];
      chart.update();
    });
  }

  function carregarDados(filtros) {
  // Aqui você buscaria os dados reais do servidor com base nos filtros.
  // Vamos assumir que `obrasFiltradas` já foi obtido do backend:
  const obrasFiltradas = []; // Substitua por seus dados reais da API

  const dadosDoServidor = {
    graficoObrasCategoria: { labels: [], datasets: [] },
    graficoNotasDistribuidas: { labels: [], datasets: [] },
    graficoAvaliacoesPorData: { labels: [], datasets: [] },
    graficoFavoritos: { labels: [], datasets: [] },
    graficoTopObras: { labels: [], datasets: [] },
    graficoFavoritosPorGenero: { labels: [], datasets: [] } // ← incluso aqui
  };

  // Lógica do gráfico de Favoritos por Gênero
  if (charts['graficoFavoritosPorGenero'] && obrasFiltradas.length > 0) {
    const favoritosPorGenero = {};

    obrasFiltradas.forEach(obra => {
      if (!favoritosPorGenero[obra.genero]) {
        favoritosPorGenero[obra.genero] = [];
      }
      favoritosPorGenero[obra.genero].push({
        titulo: obra.titulo,
        favoritos: obra.favoritos
      });
    });

    const labels = [];
    const data = [];

    Object.entries(favoritosPorGenero).forEach(([genero, obras]) => {
      const maisFavorita = obras.sort((a, b) => b.favoritos - a.favoritos)[0];
      if (maisFavorita) {
        labels.push(`${maisFavorita.titulo} (${genero})`);
        data.push(maisFavorita.favoritos);
      }
    });

    dadosDoServidor.graficoFavoritosPorGenero.labels = labels;
    dadosDoServidor.graficoFavoritosPorGenero.datasets = [{
      label: 'Favoritos',
      data,
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }];
  }

  atualizarGraficos(dadosDoServidor);
}


  function atualizarGraficos(dados) {
    for (const id in dados) {
      if (charts[id]) {
        charts[id].data.labels = dados[id].labels;
        charts[id].data.datasets = dados[id].datasets;
        charts[id].update();
      }
    }
  }
});