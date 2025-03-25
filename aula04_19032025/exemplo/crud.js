// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKpcwZHNwpuDnYGZsl5fEwb8h1kFHmCuQ",
    authDomain: "aula1903-2798c.firebaseapp.com",
    projectId: "aula1903-2798c",
    storageBucket: "aula1903-2798c.firebasestorage.app",
    messagingSenderId: "171882162599",
    appId: "1:171882162599:web:e0f23085da3e1c85282e82",
    measurementId: "G-MMSDF80GYS"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Adiciona um listener para o formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //const matricula = document.getElementById('matricula').value;
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    cadastrarUsuario(nome, senha);
});

function cadastrarUsuario(nome, senha) { // Função para cadastrar um aluno no Firestore
    db.collection('alunos').add({
        nome: nome,
        senha: senha
    })
        .then(() => {
            alert('Usuario cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset(); // Limpa o formulário
            listarUsuarios(); // Atualiza a lista de alunos após o cadastro
        })
        .catch((error) => {
            console.error('Erro ao cadastrar usuario: ', error);
            alert('Erro ao cadastrar usuario. Tente novamente.'); }); }

// Função para listar os alunos cadastrados
function listarUsuarios() {
                    const listaUsuarios = document.getElementById('listaUsuarios');
                    listaUsuarios.innerHTML = ''; // Limpa a lista antes de atualizar
                    db.collection('alunos').get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                const usuario = doc.data(); // Dados do documento
                                const itemLista = document.createElement('li'); // Cria um item de lista
                                itemLista.textContent = `Nome: ${usuario.nome} Senha: ${usuario.senha}`;
                                listaUsuarios.appendChild(itemLista); // Adiciona o item à lista
                            });
                        })
                        .catch((error) => {
                            console.error('Erro ao buscar usuarios: ', error);
                        });
                }
// Carrega a lista de alunos ao carregar a página
window.onload = listarUsuarios;