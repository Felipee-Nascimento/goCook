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
