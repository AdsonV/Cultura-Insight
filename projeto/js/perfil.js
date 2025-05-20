$(document).ready(function () {
  const sidebar = $('#sidebar');
  const overlay = $('#overlay');
  const menuToggle = $('#menuToggle');

  menuToggle.on('click', function () {
    sidebar.css('right', '0');
    overlay.show();
  });

  overlay.on('click', function () {
    sidebar.css('right', '-250px');
    overlay.hide();
  });
  document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  const userEmailElement = document.getElementById("userEmail");
  const evaluationsContainer = document.getElementById("evaluationsContainer");

  async function carregarDadosUsuario() {
    try {
      const resposta = await fetch("/api/usuario/perfil");
      if (!resposta.ok) throw new Error("Erro ao buscar perfil do usuário");

      const usuario = await resposta.json();
      usernameElement.textContent = usuario.nome;
      userEmailElement.textContent = usuario.email;
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro);
    }
  }

  async function carregarAvaliacoes() {
    try {
      const resposta = await fetch(); 
      if (!resposta.ok) throw new Error("Erro ao buscar avaliações");

      const avaliacoes = await resposta.json();

      evaluationsContainer.innerHTML = "";

      avaliacoes.forEach((avaliacao) => {
        const card = document.createElement("div");
        card.className = "evaluation-card";
        card.innerHTML = `
          <h4>${avaliacao.titulo} <span class="tipo">(${avaliacao.tipo})</span></h4>
          <p class="rating">Nota: ${avaliacao.nota}</p>
          <p>${avaliacao.texto}</p>
        `;
        evaluationsContainer.appendChild(card);
      });
    } catch (erro) {
      console.error("Erro ao carregar avaliações:", erro);
    }
  }

  carregarDadosUsuario();
  carregarAvaliacoes();
});
});
