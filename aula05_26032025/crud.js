// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDZRi0JaEHr6B57be2ZDUxP2VqmhdZfCk8",
  authDomain: "exercicio-calculocombustivel.firebaseapp.com",
  projectId: "exercicio-calculocombustivel",
  storageBucket: "exercicio-calculocombustivel.firebasestorage.app",
  messagingSenderId: "371409858360",
  appId: "1:371409858360:web:20517b8cdcce8d34e35bcd",
  measurementId: "G-FMESBZDNQ7"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Adiciona um listener para o formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const consumo_veiculo = document.getElementById('consumo_veiculo').value;
    const distancia_viagem = parseFloat(document.getElementById('distancia_viagem').value);
    const preco_combustivel = parseFloat(document.getElementById('preco_combustivel').value);
    const custo_total = (distancia_viagem / consumo_veiculo) * preco_combustivel;
    calculaViagem(consumo_veiculo, distancia_viagem, preco_combustivel, custo_total);
});

function calculaViagem(consumo_veiculo, distancia_viagem, preco_combustivel, custo_total) { // Função para cadastrar uma viagem no Firestore
    db.collection('calculo_combustivel').add({
        consumo_veiculo: consumo_veiculo,
        distancia_viagem: distancia_viagem,
        preco_combustivel: preco_combustivel,
        custo_total: custo_total
    })
        .then(() => {
            alert('Viagem cadastrada com sucesso!');
            document.getElementById('cadastroForm').reset(); // Limpa o formulário
            listarViagem(); // Atualiza a lista de viagens após o cadastro
        })
        .catch((error) => {
            console.error('Erro ao cadastrar viagem: ', error);
            alert('Erro ao cadastrar viagem. Tente novamente.'); }); }

// Função para listar as viagens cadastradas
function listarViagem() {
                    const listarViagem = document.getElementById('listaViagens');
                    listarViagem.innerHTML = ''; // Limpa a lista antes de atualizar
                    db.collection('calculo_combustivel').get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                const calculo_combustivel = doc.data();
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = `<div class="card-body">
                                            <h5 class="card-title">Distância: ${calculo_combustivel.distancia_viagem} km</h5>
                                            <p class="card-text">Consumo: ${calculo_combustivel.consumo_veiculo} km/l</p>
                                            <p class="card-text">Preço do combustível: R$ ${calculo_combustivel.preco_combustivel}</p>
                                            <p class="card-text font-weight-bold">Custo total: R$ ${calculo_combustivel.custo_total}</p>
                                         </div>`;
                        listaViagens.appendChild(card);
                    });
                })
                .catch((error) => {
                    console.error('Erro ao buscar viagem: ', error);
                });
        }
        // Carrega a lista de viagens ao carregar a página
        window.onload = listarViagem;