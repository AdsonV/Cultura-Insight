document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      sidebar.setAttribute("aria-hidden", !isActive);
      menuBtn.setAttribute("aria-expanded", isActive);
    });

    if (closeSidebar) {
      closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        sidebar.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    }

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      sidebar.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  }

  const explorarBtn = document.getElementById("explorarBtn");
  const explorarMenu = document.getElementById("explorarMenu");

  if (explorarBtn && explorarMenu) {
    explorarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = explorarBtn.getAttribute("aria-expanded") === "true";
      explorarBtn.setAttribute("aria-expanded", String(!expanded));
      explorarMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!explorarBtn.contains(e.target) && !explorarMenu.contains(e.target)) {
        explorarMenu.classList.remove("show");
        explorarBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  const anoRange = document.getElementById("anoRange");
  const anoValor = document.getElementById("anoValor");

  if (anoRange && anoValor) {
    anoRange.addEventListener("input", () => {
      anoValor.textContent = anoRange.value;
    });
  }

  const stars = document.querySelectorAll("#ratingFilter .star");
  const ratingLabel = document.getElementById("ratingLabel");

  function updateStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("text-warning");
      } else {
        star.classList.remove("text-warning");
      }
    });
  }

  if (stars.length && ratingLabel) {
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-value"));
        updateStars(rating);
        ratingLabel.textContent = `${rating}.0+`;
      });
    });
  }

  const generosBtn = document.getElementById("generosBtn");
  const generosList = document.getElementById("generosList");

  if (generosBtn && generosList) {
    generosBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      generosList.classList.toggle("show");
      const expanded = generosBtn.getAttribute("aria-expanded") === "true";
      generosBtn.setAttribute("aria-expanded", String(!expanded));
    });

    document.addEventListener("click", (e) => {
      if (!generosBtn.contains(e.target) && !generosList.contains(e.target)) {
        generosList.classList.remove("show");
        generosBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  const carregarPopularesBtn = document.getElementById("carregarPopularesBtn");
  const resultadoTitulo = document.getElementById("resultadoTitulo");
  const resultadoDescricao = document.getElementById("resultadoDescricao");

  if (carregarPopularesBtn && resultadoTitulo && resultadoDescricao) {
    carregarPopularesBtn.addEventListener("click", () => {
      resultadoTitulo.textContent = "Álbuns Populares";
      resultadoDescricao.textContent =
        "Veja os álbuns mais bem avaliados pela comunidade:";
      carregarAlbunsPopulares();
    });
  }

  function carregarAlbunsPopulares() {
    const section = document.querySelector("section.text-center");
    if (!section) return;

    const albuns = [
      { titulo: "Thriller", artista: "Michael Jackson", ano: 1982 },
      { titulo: "Dark Side of the Moon", artista: "Pink Floyd", ano: 1973 },
      { titulo: "Back to Black", artista: "Amy Winehouse", ano: 2006 }
    ];

    const lista = document.createElement("div");
    lista.classList.add("mt-4");

    albuns.forEach((album) => {
      const card = document.createElement("div");
      card.classList.add("card", "mb-3", "mx-auto");
      card.style.maxWidth = "500px";
      card.innerHTML = `
        <div class="card-body text-start">
          <h5 class="card-title">${album.titulo}</h5>
          <p class="card-text mb-1"><strong>Artista:</strong> ${album.artista}</p>
          <p class="card-text"><strong>Ano:</strong> ${album.ano}</p>
        </div>
      `;
      lista.appendChild(card);
    });

    section.appendChild(lista);
    carregarPopularesBtn.disabled = true;
    carregarPopularesBtn.textContent = "Carregado";
  }

  const aplicarFiltrosBtn = document.getElementById("aplicarFiltrosBtn");
  if (aplicarFiltrosBtn) {
    aplicarFiltrosBtn.addEventListener("click", () => {
      alert("Filtros aplicados! (Simulação front-end)");
    });
  }

  const limparFiltrosBtn = document.getElementById("limparFiltrosBtn");
  if (limparFiltrosBtn) {
    limparFiltrosBtn.addEventListener("click", () => {
      document.querySelectorAll("#generosList input[type='checkbox']").forEach(cb => cb.checked = false);
      if (anoRange && anoValor) {
        anoRange.value = 2025;
        anoValor.textContent = "2025";
      }
      updateStars(0);
      if (ratingLabel) {
        ratingLabel.textContent = "0.0+";
      }
      alert("Filtros limpos!");
    });
  }
});