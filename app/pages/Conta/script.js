// Função para buscar informações do usuário
async function buscarUsuario() {
  const token = localStorage.getItem("token"); // Recupera o token do localStorage
  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");

  // Verifica se o token existe
  if (!token) {
    alert("Você precisa estar autenticado para acessar esta página.");
    window.location.href = "../Login/index.html"; // Redireciona para login
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
    });

    // Se a resposta não for OK, redireciona para login
    if (!response.ok) {
      throw new Error("Erro ao buscar informações do usuário.");
    }

    const data = await response.json(); // Assume que a API retorna JSON no formato esperado
    nameElement.textContent = data.name; // Atualiza o nome do usuário na página
    emailElement.textContent = data.email; // Atualiza o e-mail do usuário na página
  } catch (error) {
    alert("Erro ao buscar dados do usuário. Faça login novamente.");
    localStorage.removeItem("token"); // Remove o token inválido
    window.location.href = "../Login/index.html"; // Redireciona para login
  }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", buscarUsuario);

// Função para sair da conta
function sairDaConta() {
  localStorage.removeItem("token"); // Remove o token do localStorage
  alert("Você saiu da conta.");
  window.location.href = "../Login/index.html"; // Redireciona para login
}

// Evento no botão de logout
document.querySelector(".logout-button").addEventListener("click", sairDaConta);
