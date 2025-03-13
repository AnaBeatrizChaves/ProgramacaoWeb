document.getElementById('numeroForm').addEventListener('submit', function(event) {
     // Impede o envio do formulário
    event.preventDefault();
    
    // Obtém o valor do número digitado
    const numero = parseFloat(document.getElementById('numero').value);
    
    // Chama a função para calcular o quadrado
    const resultado = calcularQuadrado(numero);

    // Exibe o resultado na página
    document.getElementById('resultado').textContent = resultado;
});

function calcularQuadrado(numero) {
    return numero * numero;
}