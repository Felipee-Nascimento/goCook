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

document
  .querySelector("#formCadastro")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    function cadastrar() {
      if (validNome && validEmail && validSenha && validConfirmSenha) {
        let listaUser = JSON.parse(sessionStorage.getItem("listaUser") || "[]");

        listaUser.push({
          nomeCad: nome.value,
          emailCad: email.value,
          senhaCad: senha.value,
        });

        sessionStorage.setItem("listaUser", JSON.stringify(listaUser));

        msgSuccess.setAttribute("style", "display: block");
        msgSuccess.innerHTML =
          "<strong>Cadastro concluído com sucesso!</strong>";
        msgError.setAttribute("style", "display: none");

        setTimeout(() => {
          window.location.href = "../Home/home.html";
        }, 3000);
      } else {
        msgError.setAttribute("style", "display: block");
        msgError.innerHTML =
          "<strong>Preencha todos os campos corretamente</strong>";
        msgSuccess.innerHTML = "";
        msgSuccess.setAttribute("style", "display: none");
      }

      fetch(`https://gocook.azurewebsites.net/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nm_Usuario: nome.value,
          nm_Email: email.value,
          ds_Senha: senha.value,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Falha no cadastro");
          }
          return response.json();
        })
        .then((data) => {
          document.getElementById("msgError").innerHTML = "";
          document.getElementById("msgSuccess").innerHTML =
            "Cadastro realizado com sucesso!";
        })
        .catch((error) => {
          console.error("Erro:", error);
          document.getElementById("msgError").innerHTML =
            "Erro ao cadastrar. Tente novamente.";
        });
    }

    console.log("Script cadastro.js carregado.");
  });
