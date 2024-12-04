document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o ID da receita da URL
  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get("id"); // Pega o ID passado na URL

  if (!receitaId) {
    alert("Receita não encontrada. Verifique o ID.");
    return;
  }

  const API_URL = `http://localhost:8080/receitas/${receitaId}`; // Endpoint para buscar a receita específica
  const token = localStorage.getItem("token"); // Pega o token do localStorage

  if (!token) {
    alert("Você precisa estar logado para visualizar a receita.");
    return;
  }

  try {
    // Faz a requisição para buscar a receita
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Envia o token no cabeçalho
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados da receita.");
    }

    const receita = await response.json(); // Recebe a resposta em JSON

    // Chama a função para renderizar a receita
    renderizarReceita(receita);
  } catch (error) {
    console.error("Erro ao carregar a receita:", error);
    alert("Não foi possível carregar a receita. Tente novamente.");
  }
});

// Função para renderizar os dados da receita na página
function renderizarReceita(receita) {
  // Atualiza o título da receita
  const titleElement = document.querySelector(".recipe-title");
  titleElement.textContent = receita.titulo;

  // Atualiza as informações (quantidade de pessoas e tempo de preparo)
  const infoGroup = document.querySelector(".info-group");
  infoGroup.innerHTML = `
    <div class="info">
      <p>${receita.quantidadeDePessoasServidas}</p>
      <img src="../../img/pessoas.png" alt="Pessoas" />
    </div>
    <div class="info">
      <p>${receita.tempoDePreparo} min</p>
      <img src="../../img/relogio.png" alt="Tempo de Preparo" />
    </div>
  `;

  // Exibe os ingredientes
  const ingredientsList = document.querySelector(".ingredients");
  ingredientsList.innerHTML = ""; // Limpa a lista antes de adicionar
  if (receita.ingrediente && receita.ingrediente.trim() !== "") {
    const ingredientesArray = receita.ingrediente.split(","); // Divide a string em itens
    ingredientesArray.forEach((ingrediente) => {
      const li = document.createElement("li");
      li.textContent = ingrediente.trim(); // Remove espaços extras
      ingredientsList.appendChild(li);
    });
  } else {
    ingredientsList.innerHTML = "<li>Ingredientes não informados</li>";
  }

  // Exibe o modo de preparo
  const stepsContainer = document.querySelector(".recipe-steps");
  stepsContainer.innerHTML = `
    <h2>Modo de Preparo:</h2>
    <p>${receita.modoDePreparo}</p>
  `;
}