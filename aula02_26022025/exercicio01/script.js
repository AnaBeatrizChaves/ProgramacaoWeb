var area = document.getElementById('area');

function entrar() {

  var nome = prompt("Digite seu nome:");
  var curso = prompt("Digite o curso:");

  if (nome === '' || nome === null || curso === '' || curso === null) {
    alert("Ops, algo deu errado!");
    area.innerHTML = "Clique no botão para acessar...";
  } else {
    area.innerHTML = `Bem-vindo ${nome}, cursando ${curso}`;
  }
  
  // Cria um botão "Sair da conta"
  let botaoSair = document.createElement("button");
  botaoSair.innerText = "Sair da conta";
  botaoSair.onclick = sair;
  area.appendChild(botaoSair); // Adiciona o botão ao DOM

  // Cria um botão para inserir as notas
  let botaoNota = document.createElement("button");
  botaoNota.innerText = "Calcular média";
  botaoNota.onclick = aluno;
  area.appendChild(botaoNota); // Adiciona o botão ao DOM
}

function aluno() {
  var nota01 = Number(prompt("Digite a nota 01:"));
  var nota02 = Number(prompt("Digite a nota 02:"));
  var nota03 = Number(prompt("Digite a nota 03:"));

  var MediaNotas = mediaTresNotas(nota01, nota02, nota03)

  if (MediaNotas >= 7) {
    alert ("Média final: " + MediaNotas.toFixed(2) + "." + "Aluno Aprovado!")
  }else {
    alert ("Média final: " + MediaNotas.toFixed(2) + "." + "Aluno Reprovado!")
  }
}

function mediaTresNotas(nota01, nota02, nota03){
  return (nota01 + nota02 + nota03)/3;
}

function sair() {
    alert ("Até mais!");
    area.innerHTML = "Você saiu!";
}

