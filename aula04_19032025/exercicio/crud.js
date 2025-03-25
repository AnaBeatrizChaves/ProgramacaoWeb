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

    const nome_vendedor = document.getElementById('nome_vendedor').value;
    const valor_venda = parseFloat(document.getElementById('valor_venda').value);
    const desconto = valor_venda * 0.05;
    const valor_final = valor_venda - desconto;
    cadastrarCompra(nome_vendedor, valor_venda, desconto, valor_final);
});

function cadastrarCompra(nome_vendedor, valor_venda, desconto, valor_final) { // Função para cadastrar um aluno no Firestore
    db.collection('compras').add({
        nome_vendedor: nome_vendedor,
        valor_venda: valor_venda,
        desconto: desconto,
        valor_final: valor_final
    })
        .then(() => {
            alert('Compra cadastrada com sucesso!');
            document.getElementById('cadastroForm').reset(); // Limpa o formulário
            listarCompras(); // Atualiza a lista de alunos após o cadastro
        })
        .catch((error) => {
            console.error('Erro ao cadastrar compra: ', error);
            alert('Erro ao cadastrar compra. Tente novamente.'); }); }

// Função para listar os alunos cadastrados
function listarCompras() {
                    const listarCompras = document.getElementById('listaCompras');
                    listarCompras.innerHTML = ''; // Limpa a lista antes de atualizar
                    db.collection('compras').get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                const compra = doc.data(); // Dados do documento
                                const itemLista = document.createElement('li'); // Cria um item de lista
                                itemLista.textContent = `Vendedor: ${compra.nome_vendedor} | Venda: R$ ${compra.valor_venda} | Desconto: R$ ${compra.desconto} | Valor Final: R$ ${compra.valor_final}`;
                                listarCompras.appendChild(itemLista); // Adiciona o item à lista
                            });
                        })
                        .catch((error) => {
                            console.error('Erro ao buscar compra: ', error);
                        });
                }
// Carrega a lista de alunos ao carregar a página
window.onload = listarCompras;