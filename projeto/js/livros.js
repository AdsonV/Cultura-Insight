document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    const explorarBtn = document.getElementById('explorarBtn');
    const explorarMenu = document.getElementById('explorarMenu');

    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    explorarBtn.addEventListener('click', () => {
        const expanded = explorarBtn.getAttribute('aria-expanded') === 'true';
        explorarBtn.setAttribute('aria-expanded', !expanded);
        explorarMenu.classList.toggle('show');
    });

    const generosDropdown = document.getElementById('generos-dropdown');
    const generosBtn = document.getElementById('generosBtn');

    generosBtn.addEventListener('click', () => {
        generosDropdown.classList.toggle('open');
    });

    const anoRange = document.getElementById('anoRange');
    const anoValor = document.getElementById('anoValor');

    anoRange.addEventListener('input', () => {
        anoValor.textContent = anoRange.value;
    });

    const ratingStars = document.querySelectorAll('#ratingFilter .star');
    const ratingLabel = document.getElementById('ratingLabel');
    let selectedRating = 0;

    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            updateRatingUI();
        });
    });

    function updateRatingUI() {
        ratingStars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            star.classList.toggle('active', value <= selectedRating);
        });
        ratingLabel.textContent = `${selectedRating}.0+`;
    }

    document.getElementById('aplicarFiltrosBtn').addEventListener('click', () => {
        alert("Funcionalidade de filtro aplicada (simulação).");
    });

    document.getElementById('limparFiltrosBtn').addEventListener('click', () => {
        document.querySelectorAll('#generosList input[type="checkbox"]').forEach(cb => cb.checked = false);
        anoRange.value = 2025;
        anoValor.textContent = "2025";
        selectedRating = 0;
        updateRatingUI();
    });

    document.getElementById('carregarPopularesBtn').addEventListener('click', () => {
        alert("Carregando livros populares... (simulação)");
    });
});
