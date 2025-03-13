document.getElementById('numeroForm').addEventListener('submit', function (event) {
   // Impede o envio do formulário
   event.preventDefault();

   // Obtém o valor do número digitado
   const numero = parseFloat(document.getElementById('numero').value);

   const option = document.getElementById('operacao').value;

   if (option == "quadrado") {
      resultado = calcularQuadrado(numero);
   } else if (option == "cubo") {
      resultado = calcularCubo(numero);
   } else {
      resultado = "Selecione uma operação!"
   }

   // Exibe o resultado na página
   document.getElementById('resultado').textContent = resultado;
});

function calcularQuadrado(numero) {
   return numero * numero;
}

function calcularCubo(numero) {
   return numero * numero * numero;
}
