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

function entrar() {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      });
  
      if (!response.ok) {
        throw new Error("Usuário ou senha incorretos");
      }
  
      const data = await response.json();
  
      // Armazena o token no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Armazena os dados do usuário (se necessário)
  
      alert("Login realizado com sucesso!");
  
      // Redireciona para a página principal
      window.location.href = "../Home/index.html";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.message);
      const msgError = document.querySelector("#msgError");
      msgError.style.display = "block";
      msgError.textContent = error.message;
    }
  });
}
