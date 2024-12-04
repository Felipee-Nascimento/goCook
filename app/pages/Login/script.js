let btn = document.querySelector("#btnEyePassword");

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  } else {
    inputSenha.type = "password";
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  }
});

async function entrar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const msgError = document.getElementById("msgError");

  // Limpa a mensagem de erro
  msgError.style.display = "none";

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });

    // Se a resposta não for OK, mostra uma mensagem de erro
    if (!response.ok) {
      throw new Error("Credenciais inválidas. Tente novamente.");
    }

    const data = await response.json();
    const token = data.token;
    
    // Armazena o token JWT no localStorage
    localStorage.setItem("token", token);

    // Exibe uma mensagem de sucesso
    alert(`Bem-vindo(a), ${data.name}!`);
    
    // Redireciona para a página principal após login
    window.location.href = "../Home/index.html"; // Altere o caminho conforme necessário

  } catch (error) {
    // Exibe a mensagem de erro
    msgError.style.display = "block";
    msgError.innerText = error.message;
  }
}
