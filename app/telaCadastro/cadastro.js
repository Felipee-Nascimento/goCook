// import config from '../config.js';

let nome = document.querySelector("#nome");
let labelNome = document.querySelector("#labelNome");
let validNome = false;

let email = document.querySelector("#email");
let labelEmail = document.querySelector("#labelEmail");
let validEmail = false;

let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");
let validSenha = false;

let confirmSenha = document.querySelector("#confirmSenha");
let labelConfirmSenha = document.querySelector("#labelConfirmSenha");
let validConfirmSenha = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

let btnEyePassword = document.getElementById('verSenha')
let btnEyeConfirmPassword = document.getElementById('verConfirmSenha')

btnEyePassword.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')


  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnEyeConfirmPassword.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha')

  if (inputConfirmSenha.getAttribute('type') == 'password') {
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})



nome.addEventListener("keyup", () => {
  if (nome.value.length < 3) {
    labelNome.setAttribute("style", "color: red");
    labelNome.innerText = "Insira no minimo 3 caracteres";
    nome.setAttribute("style", "border-color: red");
    validNome = false;
  } else {
    labelNome.setAttribute("style", "color: green");
    labelNome.innerText = "Nome";
    nome.setAttribute("style", "border-color: green");
    validNome = true;
  }
});

email.addEventListener("keyup", () => {
  if (email.value.length < 5) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerText = "Insira no minimo 5 caracteres";
    email.setAttribute("style", "border-color: red");
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: green");
    labelEmail.innerText = "Email";
    email.setAttribute("style", "border-color: green");
    validEmail = true;
  }
});

senha.addEventListener("keyup", () => {
  if (senha.value.length < 6) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerText = "Insira no minimo 6 caracteres";
    senha.setAttribute("style", "border-color: red");
    validSenha = false;
  } else {
    labelSenha.setAttribute("style", "color: green");
    labelSenha.innerText = "Senha";
    senha.setAttribute("style", "border-color: green");
    validSenha = true;
  }
});

confirmSenha.addEventListener("keyup", () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute("style", "color: red");
    labelConfirmSenha.innerText = "As senhas não conferem";
    confirmSenha.setAttribute("style", "border-color: red");
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute("style", "color: green");
    labelConfirmSenha.innerText = "Confirmar Senha";
    confirmSenha.setAttribute("style", "border-color: green");
    validConfirmSenha = true;
  }
});

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
    msgSuccess.innerHTML = "<strong>Cadastro concluído</strong>";
    msgError.setAttribute("style", "display: none");
    msgError.innerHTML = "";

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

  // ...

  fetch(`https://gocook.azurewebsites.net/api/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nm_Usuario: nome,
      nm_Email: email,
      ds_Senha: senha,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha no cadastro');
      }
      return response.json();
    })
    .then(data => {
      // Limpar mensagens de erro e exibir mensagem de sucesso
      document.getElementById('msgError').innerHTML = '';
      document.getElementById('msgSuccess').innerHTML = 'Cadastro realizado com sucesso!';
    })
    .catch(error => {
      console.error('Erro:', error);
      document.getElementById('msgError').innerHTML = 'Erro ao cadastrar. Tente novamente.';
    });

}


console.log('Script cadastro.js carregado.');

