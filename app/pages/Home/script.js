function cancelOrder() {
  document.getElementById("cancelModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("cancelModal").style.display = "none";
}

// URL base da API
const API_URL = "http://localhost:8080/receitas";

// Função para buscar e exibir receitas
async function carregarReceitas() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Usuário não autenticado. Faça login para continuar.");
    window.location.href = "../Login/index.html"; // Redireciona para a página de login
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const receitas = await response.json();
      console.log("Receitas carregadas:", receitas);
      renderizarReceitas(receitas);
    } else {
      console.error("Erro ao carregar receitas:", response.status);
      alert("Erro ao carregar receitas. Verifique sua autenticação.");
    }
  } catch (error) {
    console.error("Erro na requisição de receitas:", error);
    alert("Erro ao carregar receitas.");
  }
}

// Função para renderizar as receitas no HTML
function renderizarReceitas(receitas) {
  const mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = ""; // Limpa o conteúdo antes de adicionar novas receitas

  receitas.forEach((receita) => {
    const receitaElement = document.createElement("div");
    receitaElement.classList.add("item");

    receitaElement.innerHTML = `
      <div class="item-details">
        <a class="button-nome-receita" href="../Receita/index.html?id=${receita.id}">
          <h2>${receita.titulo}</h2>
        </a>
        <div class="info-group">
          <div class="info">
            <p>${receita.quantidadeDePessoasServidas}</p>
            <img src="../../img/pessoas.png" alt="Pessoas" />
          </div>
          <div class="info">
            <p>${receita.tempoDePreparo} min</p>
            <img src="../../img/relogio.png" alt="Tempo de Preparo" />
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="delete-button" onclick="excluirReceita(${receita.id})">Excluir</button>
      </div>
    `;

    mainContent.appendChild(receitaElement);
  });
}

// Função para excluir uma receita
async function excluirReceita(receitaId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Usuário não autenticado. Faça login para continuar.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${receitaId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Receita excluída com sucesso!");
      carregarReceitas(); // Recarrega as receitas após exclusão
    } else {
      console.error("Erro ao excluir receita:", response.status);
      alert("Erro ao excluir a receita.");
    }
  }catch (error) {
    console.error("Erro na requisição de exclusão:", error);
    alert("Erro ao excluir a receita.");
  }
}

// Carregar receitas ao carregar a página
document.addEventListener("DOMContentLoaded", carregarReceitas);