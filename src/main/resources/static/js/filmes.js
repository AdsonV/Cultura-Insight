


const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const explorarBtn = document.getElementById('explorarBtn');
const explorarMenu = document.getElementById('explorarMenu');

explorarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const isShown = explorarMenu.classList.contains('show');
    if (isShown) {
        explorarMenu.classList.remove('show');
        explorarBtn.setAttribute('aria-expanded', 'false');
    } else {
        explorarMenu.classList.add('show');
        explorarBtn.setAttribute('aria-expanded', 'true');
    }
});



function openSidebar() {
    sidebar.classList.add('open');
    overlay.style.display = 'block';
    menuBtn.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
    menuBtn.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
}

menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

closeSidebarBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

const generosBtn = document.getElementById('generosBtn');
const generosList = document.getElementById('generosList');

function toggleGenerosDropdown() {
    const expanded = generosBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        generosList.style.display = 'none';
        generosBtn.setAttribute('aria-expanded', 'false');
    } else {
        generosList.style.display = 'block';
        generosBtn.setAttribute('aria-expanded', 'true');
        generosList.focus();
    }
}

generosBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleGenerosDropdown();
});

document.addEventListener('click', (e) => {
    if (
        !generosList.contains(e.target) &&
        e.target !== generosBtn
    ) {
        generosList.style.display = 'none';
        generosBtn.setAttribute('aria-expanded', 'false');
    }
});

function updateGenerosBtnLabel() {
    const checkboxes = generosList.querySelectorAll('input[type="checkbox"]');
    const selecionados = [];
    checkboxes.forEach((cb) => {
        if (cb.checked) {
            selecionados.push(cb.value);
        }
    });
    if (selecionados.length > 0) {
        generosBtn.innerHTML = selecionados.join(', ') + ' <i class="fas fa-chevron-down"></i>';
    } else {
        generosBtn.innerHTML = 'Selecione os gêneros <i class="fas fa-chevron-down"></i>';
    }
}

generosList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', updateGenerosBtnLabel);
});

const anoRange = document.getElementById('anoRange');
const anoValor = document.getElementById('anoValor');

anoRange.addEventListener('input', () => {
    anoValor.textContent = anoRange.value;
});

const aplicarFiltrosBtn = document.getElementById('aplicarFiltrosBtn');
const limparFiltrosBtn = document.getElementById('limparFiltrosBtn');

const resultadoTitulo = document.getElementById('resultadoTitulo');
const resultadoDescricao = document.getElementById('resultadoDescricao');

aplicarFiltrosBtn.addEventListener('click', () => {
    const checkboxes = generosList.querySelectorAll('input[type="checkbox"]');
    const generosSelecionados = [];
    checkboxes.forEach((cb) => {
        if (cb.checked) {
            generosSelecionados.push(cb.value);
        }
    });

    const anoSelecionado = anoRange.value;


    let textoGeneros = generosSelecionados.length
        ? generosSelecionados.join(', ')
        : 'Nenhum gênero selecionado';

    resultadoTitulo.textContent = 'Filmes filtrados';
    resultadoDescricao.textContent = `Gêneros: ${textoGeneros} | Ano até: ${anoSelecionado}`;
});

limparFiltrosBtn.addEventListener('click', () => {
    generosList.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
    });
    updateGenerosBtnLabel();

    anoRange.value = 2025;
    anoValor.textContent = 2025;

    resultadoTitulo.textContent = 'Nenhum filme encontrado';
    resultadoDescricao.textContent = 'Use os filtros para encontrar filmes ou faça uma busca acima.';
});

const carregarPopularesBtn = document.getElementById('carregarPopularesBtn');
carregarPopularesBtn.addEventListener('click', () => {
    resultadoTitulo.textContent = 'Filmes Populares';
    resultadoDescricao.textContent = 'Aqui serão carregados os filmes mais populares.';
});

const stars = document.querySelectorAll("#ratingFilter .star");
const ratingLabel = document.getElementById("ratingLabel");
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-value"));
        updateStars(selectedRating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.getAttribute("data-value"));
        star.classList.toggle("active", value <= rating);
    });
    ratingLabel.textContent = rating.toFixed(1) + "+";
}

document.getElementById("aplicarFiltrosBtn").addEventListener("click", () => {
    console.log("Avaliação mínima selecionada:", selectedRating);   
});
