document.addEventListener('DOMContentLoaded', () => {
  const botaoMenu = document.getElementById('menuBtn');
  const menuLateral = document.getElementById('sidebar');
  const botaoFecharMenu = document.getElementById('closeSidebar');
  const fundoEscuro = document.getElementById('overlay');
  const botaoExplorar = document.getElementById('explorarBtn');
  const menuExplorar = document.getElementById('explorarMenu');

  botaoMenu.addEventListener('click', () => {
    menuLateral.classList.add('active');
    fundoEscuro.classList.add('active');
  });

  botaoFecharMenu.addEventListener('click', () => {
    menuLateral.classList.remove('active');
    fundoEscuro.classList.remove('active');
  });

  fundoEscuro.addEventListener('click', () => {
    menuLateral.classList.remove('active');
    fundoEscuro.classList.remove('active');
  });

  botaoExplorar.addEventListener('click', () => {
    const estaExpandido = botaoExplorar.getAttribute('aria-expanded') === 'true';
    botaoExplorar.setAttribute('aria-expanded', !estaExpandido);
    menuExplorar.classList.toggle('show');
  });
});

document.addEventListener('DOMContentLoaded', () => {
 const editarPerfilBtn = document.getElementById('editarPerfilBtn');
  const editarPerfilModal = new bootstrap.Modal(document.getElementById('editarPerfilModal'));

  editarPerfilBtn.addEventListener('click', () => {
    editarPerfilModal.show();
  });

  // Gráficos: Inicialização vazia (dados a serem preenchidos dinamicamente)
  const ctxNotas = document.getElementById('graficoNotas').getContext('2d');
  const ctxMediaNotas = document.getElementById('graficoMediaNotas').getContext('2d');

  window.graficoNotas = new Chart(ctxNotas, {
    type: 'bar',
    data: {
      labels: [], // inserir categorias dinamicamente
      datasets: [{
        label: 'Número de avaliações',
        data: [],
        backgroundColor: 'rgba(111, 66, 193, 0.7)',
        borderRadius: 5,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  window.graficoMediaNotas = new Chart(ctxMediaNotas, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Média das notas',
        data: [],
        borderColor: 'rgba(111, 66, 193, 0.9)',
        backgroundColor: 'rgba(111, 66, 193, 0.4)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 10 }
      }
    }
  });

  function atualizarRankingObras(obras) {
    const lista = document.getElementById('rankingObras');
    lista.innerHTML = '';
    obras.forEach(obra => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = obra.titulo;
      const badge = document.createElement('span');
      badge.className = 'badge bg-purple rounded-pill';
      badge.textContent = obra.avaliacoes;
      li.appendChild(badge);
      lista.appendChild(li);
    });
  }

  window.atualizarRankingObras = atualizarRankingObras;
});
document.addEventListener('DOMContentLoaded', () => {
  const ctxCategorias = document.getElementById('graficoCategorias').getContext('2d');

  window.graficoCategorias = new Chart(ctxCategorias, {
    type: 'doughnut',
    data: {
      labels: ['Filmes', 'Livros', 'Álbuns'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(111, 66, 193, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: 'white',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              weight: '600'
            }
          }
        }
      }
    }
  });
});

/**
 
 @param {{filmes: number, livros: number, albuns: number}} dados 
 */
function atualizarGraficoCategorias(dados) {
  if (!window.graficoCategorias) return;

  window.graficoCategorias.data.datasets[0].data = [
    dados.filmes || 0,
    dados.livros || 0,
    dados.albuns || 0
  ];
  window.graficoCategorias.update();
}

window.atualizarGraficoCategorias = atualizarGraficoCategorias;

document.addEventListener('DOMContentLoaded', () => {
  const inputPesquisa = document.getElementById('pesquisaObra');
  const selectCategoria = document.getElementById('filtroCategoria');
  const inputDataInicio = document.getElementById('filtroDataInicio');
  const inputDataFim = document.getElementById('filtroDataFim');
  const selectNota = document.getElementById('filtroNota');
  const listaAvaliacoes = document.getElementById('listaAvaliacoes');

  window.avaliacoesUsuario = [];

  /**
  
    @param {Array} avaliacoes
   */
  function renderizarAvaliacoes(avaliacoes) {
    listaAvaliacoes.innerHTML = '';
    if (avaliacoes.length === 0) {
      listaAvaliacoes.innerHTML = `<div class="text-center text-muted py-4">Nenhuma avaliação encontrada.</div>`;
      return;
    }

    avaliacoes.forEach(av => {
      const item = document.createElement('div');
      item.className = 'avaliacao-item';

      item.innerHTML = `
        <div class="avaliacao-titulo">${av.titulo}</div>
        <div class="avaliacao-meta">
          <div><strong>Categoria:</strong> ${av.categoria}</div>
          <div><strong>Data:</strong> ${new Date(av.data).toLocaleDateString()}</div>
          <div><strong>Nota:</strong> <span class="avaliacao-nota">${av.nota} ★</span></div>
        </div>
        <div class="avaliacao-texto">${av.comentario || ''}</div>
      `;

      listaAvaliacoes.appendChild(item);
    });
  }

  function aplicarFiltros() {
    const pesquisa = inputPesquisa.value.trim().toLowerCase();
    const categoria = selectCategoria.value;
    const dataInicio = inputDataInicio.value ? new Date(inputDataInicio.value) : null;
    const dataFim = inputDataFim.value ? new Date(inputDataFim.value) : null;
    const notaFiltro = selectNota.value;

    let filtradas = window.avaliacoesUsuario;

    if (categoria !== 'todas' && categoria !== 'favoritos') {
      filtradas = filtradas.filter(av => av.categoria.toLowerCase() === categoria);
    } else if (categoria === 'favoritos') {
      filtradas = filtradas.filter(av => av.favorito === true);
    }

    if (pesquisa) {
      filtradas = filtradas.filter(av =>
        av.titulo.toLowerCase().includes(pesquisa) ||
        (av.comentario && av.comentario.toLowerCase().includes(pesquisa))
      );
    }

    if (dataInicio) {
      filtradas = filtradas.filter(av => new Date(av.data) >= dataInicio);
    }

    if (dataFim) {
      filtradas = filtradas.filter(av => new Date(av.data) <= dataFim);
    }

    if (notaFiltro !== 'todas') {
      filtradas = filtradas.filter(av => av.nota === Number(notaFiltro));
    }

    renderizarAvaliacoes(filtradas);
  }

  inputPesquisa.addEventListener('input', aplicarFiltros);
  selectCategoria.addEventListener('change', aplicarFiltros);
  inputDataInicio.addEventListener('change', aplicarFiltros);
  inputDataFim.addEventListener('change', aplicarFiltros);
  selectNota.addEventListener('change', aplicarFiltros);

  window.atualizarAvaliacoesUsuario = function(novasAvaliacoes) {
    window.avaliacoesUsuario = novasAvaliacoes || [];
    aplicarFiltros();
  };
});