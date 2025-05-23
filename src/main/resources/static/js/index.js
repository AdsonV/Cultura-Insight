document.addEventListener("DOMContentLoaded", () => {
    const avaliacoes = [
      {
      }
    ];
  
    const container = document.getElementById("avaliacoesContainer");
  
    avaliacoes.slice(0, 3).forEach(avaliacao => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
  
      col.innerHTML = `
        <div class="card p-3">
          <h6><strong>${avaliacao.nome}</strong> ⭐ ${avaliacao.nota}/10</h6>
          <h5>${avaliacao.obra}</h5>
          <p>${avaliacao.texto}</p>
        </div>
      `;
  
      container.appendChild(col);
    });
  });