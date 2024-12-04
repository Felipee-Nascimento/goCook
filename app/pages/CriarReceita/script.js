function adicionarIngrediente() {
  var listaIngredientes = document.getElementById("listaIngredientes");

  var novoItem = document.createElement("li");
  novoItem.className = "ingrediente-item";

  novoItem.innerHTML = `
        <input
          type="text"
          class="nomeIngrediente"
          placeholder="Nome"
          required
        />
        <input
          type="text"
          class="quantidadeIngrediente"
          placeholder="Quantidade"
        />
    `;

  var botaoRemover = document.createElement("button");
  botaoRemover.className = "botao-remover";
  botaoRemover.textContent = "-";
  botaoRemover.onclick = function () {
    listaIngredientes.removeChild(novoItem);
  };

  novoItem.appendChild(botaoRemover);

  listaIngredientes.appendChild(novoItem);
}

document
  .getElementById("adicionarIngrediente")
  .addEventListener("click", adicionarIngrediente);

  const API_URL = 'http://localhost:8080/receitas'; // Alterar para o endpoint correto

document.getElementById("formCriarReceita").addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Coleta os dados do formulário
  const nomeReceita = document.getElementById("nomeReceita").value;
  const quantidadePessoas = document.getElementById("quantidadePessoas").value;
  const tempoPreparo = document.getElementById("tempoPreparo").value;
  const modoPreparo = document.getElementById("modoPreparo").value;

  // Coleta os ingredientes e transforma em uma única string
const ingredientesList = document
.getElementById("listaIngredientes")
.getElementsByTagName("li");
let ingredientes = []; // Armazena os ingredientes temporariamente para concatenação

for (let i = 0; i < ingredientesList.length; i++) {
const nome = ingredientesList[i]
  .querySelector(".nomeIngrediente")
  .value.trim();
const quantidade = ingredientesList[i]
  .querySelector(".quantidadeIngrediente")
  .value.trim();

if (nome) {
  // Formata o ingrediente como uma string
  const ingredienteString = quantidade
    ? `${nome} (${quantidade})`
    : nome;
  ingredientes.push(ingredienteString);
}
}

// Concatena os ingredientes em uma única string separada por vírgulas
const ingredientesString = ingredientes.join(", "); // Junta tudo em uma string

// Cria o objeto com os dados da receita
const receitaData = {
titulo: nomeReceita,
quantidadeDePessoasServidas: quantidadePessoas,
tempoDePreparo: tempoPreparo,
modoDePreparo: modoPreparo,
ingrediente: ingredientesString, // Passa os ingredientes como string
};

  // Pega o token JWT armazenado no localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado para criar uma receita.");
    return;
  }

  try {
    // Faz a requisição POST para criar a receita
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho
      },
      body: JSON.stringify(receitaData),
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao criar receita');
    }

    // Exibe a resposta da API (informações da receita criada)
    const receitaCriada = await response.json();
    alert(`Receita criada com sucesso! ID: ${receitaCriada.id}`);

    // Redireciona o usuário ou limpa o formulário, caso necessário
    document.getElementById("formCriarReceita").reset(); // Limpa o formulário
    document.getElementById("listaIngredientes").innerHTML = ""; // Limpa a lista de ingredientes
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    alert('Não foi possível criar a receita. Tente novamente.');
  }
});