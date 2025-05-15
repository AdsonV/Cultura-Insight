document.addEventListener("DOMContentLoaded", () => {
    const avaliacoes = [
      {
        nome: "Maria Costa",
        obra: "Duna (2021)",
        nota: 8.5,
        texto: "Uma adaptação visualmente impressionante que captura a essência do livro..."
      },
      {
        nome: "João Silva",
        obra: "Torto Arado",
        nota: 8.0,
        texto: "Uma narrativa poderosa sobre a vida no sertão brasileiro..."
      },
      {
        nome: "Ana Rodrigues",
        obra: "Happier Than Ever – Billie Eilish",
        nota: 9.5,
        texto: "Um álbum maduro e introspectivo que mostra a evolução artística de Billie..."
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