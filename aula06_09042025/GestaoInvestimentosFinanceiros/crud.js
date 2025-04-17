// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlDYFjSivP57uZ_1zBknURFGae1S6ou5s",
  authDomain: "gestaoinvestimentofinanceiro.firebaseapp.com",
  projectId: "gestaoinvestimentofinanceiro",
  storageBucket: "gestaoinvestimentofinanceiro.firebasestorage.app",
  messagingSenderId: "1012856926169",
  appId: "1:1012856926169:web:65cc8d56024611d0b8f3c8",
  measurementId: "G-KL3RF254SB"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variáveis de controle
let editando = false;
let investimentoIdAtual = null;

// Evento de submit do formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;
  const tipo = document.getElementById('tipo').value;
  const valor = document.getElementById('valor').value;
  
  if (editando) {
    atualizarInvestimento(investimentoIdAtual, data, descricao, tipo, valor);
  } else {
    cadastrarInvestimento(data, descricao, tipo, valor);
  }
});

// Evento do botão cancelar
document.getElementById('btnCancelar').addEventListener('click', cancelarEdicao);

// Função para cadastrar aluno
function cadastrarInvestimento(data, descricao, tipo, valor) {
  db.collection('investimento').add({
    data: data,
    descricao: descricao,
    tipo: tipo,
    valor: valor
  })
  .then(() => {
    alert('Investimento cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
    listarInvestimento();
  })
  .catch((error) => {
    console.error('Erro ao cadastrar investimento:', error);
    alert('Erro ao cadastrar investimento.');
  });
}

// Função para listar investimentos
function listarInvestimento() {
  const tbody = document.querySelector('#listaInvestimento tbody');
  tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';

  db.collection('investimento').get()
    .then((querySnapshot) => {
      tbody.innerHTML = '';
      
      if (querySnapshot.empty) {
        tbody.innerHTML = '<tr><td colspan="4">Nenhum investimento cadastrado.</td></tr>';
        return;
      }

      querySnapshot.forEach((doc) => {
        const investimento = doc.data();
        const investimentoId = doc.id;
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${investimento.data}</td>
          <td>${investimento.descricao}</td>
          <td>${investimento.tipo}</td>
          <td>${investimento.valor}</td>
          <td class="actions">
            <button onclick="editarInvestimento('${investimentoId}', '${investimento.data}', '${investimento.descricao}', '${investimento.tipo}', '${investimento.valor}')">Editar</button>
            <button onclick="excluirInvestimento('${investimentoId}')">Excluir</button>
          </td>
        `;
        //implementar a paginação 
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar investimentos:', error);
      tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar investimentos.</td></tr>';
    });
}

// Função para editar investimento
function editarInvestimento(id, data, descricao, tipo, valor) {
  editando = true;
  investimentoIdAtual = id;
  
  document.getElementById('investimentoId').value = id;
  document.getElementById('data').value = data;
  document.getElementById('descricao').value = descricao;
  document.getElementById('tipo').value = tipo;
  document.getElementById('valor').value = valor;
  
  document.getElementById('btnCadastrar').textContent = 'Atualizar';
  document.getElementById('btnCancelar').style.display = 'inline-block';
}

// Função para atualizar investimento
function atualizarInvestimento(id, data, descricao, tipo, valor) {
  db.collection('investimento').doc(id).update({
    data: data,
    descricao: descricao,
    tipo: tipo,
    valor: valor
  })
  .then(() => {
    alert('Investimento atualizado com sucesso!');
    cancelarEdicao();
    listarInvestimento();
  })
  .catch((error) => {
    console.error('Erro ao atualizar investimento:', error);
    alert('Erro ao atualizar investimento.');
  });
}

// Função para excluir investimento
function excluirInvestimento(id) {
  if (confirm('Tem certeza que deseja excluir este investimento?')) {
    db.collection('investimento').doc(id).delete()
      .then(() => {
        alert('Investimento excluído com sucesso!');
        listarInvestimento();
      })
      .catch((error) => {
        console.error('Erro ao excluir investimento:', error);
        alert('Erro ao excluir investimento.');
      });
  }
}

// Função para cancelar edição
function cancelarEdicao() {
  editando = false;
  investimentoIdAtual = null;
  
  document.getElementById('cadastroForm').reset();
  document.getElementById('investimentoId').value = '';
  
  document.getElementById('btnCadastrar').textContent = 'Cadastrar';
  document.getElementById('btnCancelar').style.display = 'none';
}

// Carrega os investimentos quando a página é carregada
window.onload = listarInvestimento;