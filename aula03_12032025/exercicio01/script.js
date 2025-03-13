document.getElementById('numeroForm').addEventListener('submit', function (event) {
    // Impede o envio do formulário
    event.preventDefault();

    // Obtém o valor do número digitado
    const numero = parseFloat(document.getElementById('numero').value);

    // Chama a função para calcular o quadrado
    const quadrado = calcularQuadrado(numero);

    //chama a função para calcular o cubo
    const cubo = calcularCubo(numero);

    // Exibe o resultado na página
    document.getElementById('quadrado').textContent = quadrado;
    document.getElementById('cubo').textContent = cubo;
});

function calcularQuadrado(numero) {
    return numero * numero;
}

function calcularCubo(numero) {
    return numero * numero * numero;
}