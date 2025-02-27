var area = document.getElementById('area');
function entrar() {
  var nome = prompt("Digite seu nome:");
  if (nome === '' || nome === null) {
    alert("Ops, algo deu errado!");
    area.innerHTML = "Clique no botão para acessar...";
  } else {
    area.innerHTML = "Bem-vindo, " + nome + "! ";

    // Cria um botão "Sair da conta"
    let botaoSair = document.createElement("button");
    botaoSair.innerText = "Sair da conta";
    botaoSair.onclick = sair(nome);
   area.appendChild(botaoSair); // Adiciona o botão ao DOM
  }
}

function sair(nome) {
  alert ("Até mais, " + nome + "!");
  area.innerHTML = "Você saiu!";
}
