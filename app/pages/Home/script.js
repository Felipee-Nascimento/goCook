function cancelOrder() {
  document.getElementById("cancelModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("cancelModal").style.display = "none";
}

// Função para buscar receitas da API
async function fetchReceitas() {
  try {
    const response = await fetch('http://localhost:8080/receitas'); // Substitua pela URL da API
    if (!response.ok) {
      throw new Error('Erro ao buscar as receitas');
    }
    const receitas = await response.json();
    renderReceitas(receitas);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para renderizar as receitas no front-end
function renderReceitas(receitas) {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = ''; // Limpa o conteúdo atual

  receitas.forEach(receita => {
    const receitaElement = document.createElement('div');
    receitaElement.classList.add('item');
    
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
        <button class="delete-button" onclick="deleteReceita(${receita.id})">
          Excluir
        </button>
      </div>
    `;

    mainContent.appendChild(receitaElement);
  });
}

// Função para excluir uma receita
async function deleteReceita(id) {
  try {
    const response = await fetch(`'http://localhost:8080/receitas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir a receita');
    }
    alert('Receita excluída com sucesso');
    fetchReceitas(); // Atualiza a lista de receitas
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Chamada inicial para carregar as receitas
fetchReceitas();
