let nome = document.querySelector("#nome");
let validNome = false;

let email = document.querySelector("#email");
let validEmail = false;

let senha = document.querySelector("#senha");
let validSenha = false;

let confirmSenha = document.querySelector("#confirmSenha");
let validConfirmSenha = false;

let msgSuccess = document.querySelector("#msgSuccess");
let msgError = document.querySelector("#msgError");

let btnEyePassword = document.getElementById("verSenha");
let btnEyeConfirmPassword = document.getElementById("verConfirmSenha");

btnEyePassword.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnEyePassword.classList.remove("fa-eye");
    btnEyePassword.classList.add("fa-eye-slash");
  } else {
    inputSenha.type = "password";
    btnEyePassword.classList.remove("fa-eye-slash");
    btnEyePassword.classList.add("fa-eye");
  }
});

btnEyeConfirmPassword.addEventListener("click", () => {
  let inputConfirmSenha = document.querySelector("#confirmSenha");

  if (inputConfirmSenha.type === "password") {
    inputConfirmSenha.type = "text";
    btnEyeConfirmPassword.classList.remove("fa-eye");
    btnEyeConfirmPassword.classList.add("fa-eye-slash");
  } else {
    inputConfirmSenha.type = "password";
    btnEyeConfirmPassword.classList.remove("fa-eye-slash");
    btnEyeConfirmPassword.classList.add("fa-eye");
  }
});

nome.addEventListener("keyup", () => {
  if (nome.value.length < 3) {
    nome.setAttribute("style", "border-color: red");
    validNome = false;
  } else {
    nome.setAttribute("style", "border-color: green");
    validNome = true;
  }
});

email.addEventListener("keyup", () => {
  if (email.value.length < 5) {
    email.setAttribute("style", "border-color: red");
    validEmail = false;
  } else {
    email.setAttribute("style", "border-color: green");
    validEmail = true;
  }
});

senha.addEventListener("keyup", () => {
  if (senha.value.length < 6) {
    senha.setAttribute("style", "border-color: red");
    validSenha = false;
  } else {
    senha.setAttribute("style", "border-color: green");
    validSenha = true;
  }
});

confirmSenha.addEventListener("keyup", () => {
  if (senha.value !== confirmSenha.value) {
    confirmSenha.setAttribute("style", "border-color: red");
    validConfirmSenha = false;
  } else {
    confirmSenha.setAttribute("style", "border-color: green");
    validConfirmSenha = true;
  }
});

// Função para cadastrar o usuário
async function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmSenha = document.getElementById("confirmSenha").value.trim();
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  // Limpa mensagens de erro e sucesso
  msgError.style.display = "none";
  msgSuccess.style.display = "none";

  // Verifica se as senhas coincidem
  if (senha !== confirmSenha) {
    msgError.style.display = "block";
    msgError.innerText = "As senhas não coincidem.";
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        password: senha,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário. Tente novamente.");
    }

    const data = await response.json();
    const token = data.token;

    // Armazena o token JWT no localStorage
    localStorage.setItem("token", token);

    // Exibe uma mensagem de sucesso e redireciona para a página de login
    msgSuccess.style.display = "block";
    msgSuccess.innerText = "Cadastro realizado com sucesso!";
    setTimeout(() => {
      window.location.href = "../Home/index.html"; // Altere conforme necessário
    }, 1500);
  } catch (error) {
    // Exibe a mensagem de erro
    msgError.style.display = "block";
    msgError.innerText = error.message;
  }
}

// Evento de envio do formulário
document.getElementById("formCadastro").addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  cadastrar();
});

