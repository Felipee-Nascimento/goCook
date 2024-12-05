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
    preencherFormulario(receita);


  } catch (error) {
    console.error("Erro ao carregar a receita:", error);
    alert("Não foi possível carregar a receita. Tente novamente.");
  }
});

function preencherFormulario(receita) {
  // Preenche os campos do formulário
  document.getElementById('nomeReceita').value = receita.titulo;
  document.getElementById('quantidadePessoas').value = receita.quantidadeDePessoasServidas;
  document.getElementById('tempoPreparo').value = receita.tempoDePreparo;
  document.getElementById('modoPreparo').value = receita.modoDePreparo;

  if(!receita.ingrediente) return;
  const ingredientesArray = receita.ingrediente.split(','); // Divide por vírgula
  const listaIngredientes = document.getElementById('listaIngredientes');
  listaIngredientes.innerHTML = ''; // Limpa a lista existente

  ingredientesArray.forEach((ingrediente) => {
    const match = ingrediente.trim().match(/^(.*)\s\((.*)\)$/); // Extrai nome e quantidade
    const nome = match ? match[1].trim() : ingrediente.trim(); // Nome do ingrediente
    const quantidade = match ? match[2].trim() : ''; // Quantidade do ingrediente

    adicionarIngrediente(nome, quantidade);

    
  });
}

// Função para adicionar um ingrediente com botão de remoção
function adicionarIngrediente(nome = '', quantidade = '') {
  const listaIngredientes = document.getElementById('listaIngredientes');

  const novoItem = document.createElement('li');
  novoItem.className = 'ingrediente-item';

  novoItem.innerHTML = `
    <input
      type="text"
      class="nomeIngrediente"
      value="${nome}"
      placeholder="Nome"
      required
    />
    <input
      type="text"
      class="quantidadeIngrediente"
      value="${quantidade}"
      placeholder="Quantidade"
    />
  `;

  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'botao-remover';
  botaoRemover.textContent = '-';
  botaoRemover.onclick = function () {
    listaIngredientes.removeChild(novoItem);
  };

  novoItem.appendChild(botaoRemover);
  listaIngredientes.appendChild(novoItem);
}

// Configuração do evento do botão de adicionar ingrediente
document.getElementById('adicionarIngrediente').addEventListener('click', () => adicionarIngrediente());



document.getElementById("formCriarReceita").addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const urlParams = new URLSearchParams(window.location.search);
  const receitaId = urlParams.get("id"); // Pega o ID passado na URL
  
  const API_URL = `http://localhost:8080/receitas/${receitaId}`; // Alterar para o endpoint correto
  
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
      method: 'PUT',
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
    alert(`Receita atualizada com sucesso! ID: ${receitaCriada.id}`);
    window.location.href="../Receita/index.html?id=" + receitaCriada.id;

  } catch (error) {
    console.error('Erro ao criar receita:', error);
    alert('Não foi possível criar a receita. Tente novamente.');
  }
});