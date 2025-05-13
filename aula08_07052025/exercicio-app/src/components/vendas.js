import { useState } from 'react';
import '../App.css';

function Vendas() {
  const [valorVenda, setValorVenda] = useState('');
  const [valorFinal, setValorFinal] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const calcularDesconto = () => {
    const venda = parseFloat(valorVenda);

    if (isNaN(venda)) {
      setMensagem('Digite um valor válido');
      setValorFinal(null);
      return;
    }

    let desconto = venda <= 300 ? 0.05 : 0.03;
    let final = venda - (venda * desconto);

    setValorFinal(final.toFixed(2));
    setMensagem(`Desconto aplicado: ${desconto * 100}%`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Calculadora de Desconto</h1>

        <input
          type="number"
          placeholder="Digite o valor da venda"
          value={valorVenda}
          onChange={(e) => setValorVenda(e.target.value)}
          className="form-control"
        />

        <button onClick={calcularDesconto}>Calcular</button>

        {mensagem && <p>{mensagem}</p>}
        {valorFinal !== null && (
          <p>Valor com desconto: R$ {valorFinal}</p>
        )}
      </header>
    </div>
  );
}

export default Vendas;