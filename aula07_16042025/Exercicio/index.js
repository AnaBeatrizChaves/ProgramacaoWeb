const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

let salarios = [];

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// serve adicionar um salário (POST)
app.post('/adicionar', (req, res) => {
  const salario = parseFloat(req.body.salario);
  if (!isNaN(salario) && salario > 0) {
    salarios.push(salario);
    console.log(`Salário adicionado: R$ ${salario.toFixed(2)}`);
  }
  res.redirect('/');
});

// obter salários (GET) - chamada pela página usando fetch
app.get('/salarios', (req, res) => {
  const maiorSalario = salarios.length ? Math.max(...salarios) : 0;
  res.json({ salarios, maiorSalario });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
