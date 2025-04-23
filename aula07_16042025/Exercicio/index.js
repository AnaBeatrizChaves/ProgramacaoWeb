const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

let salarios = [];

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'views', 'index.html');
  
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    if (err) {
      console.error('Erro ao ler o arquivo HTML:', err);
      return res.status(500).send('Erro ao carregar a página');
    }

    const lista = salarios.length
      ? salarios.map(s => `<li>R$ ${s.toFixed(2)}</li>`).join('')
      : '<li>Nenhum salário cadastrado</li>';

    const maior = salarios.length
      ? `R$ ${Math.max(...salarios).toFixed(2)}`
      : 'Nenhum salário cadastrado';

    const htmlAtualizado = html
      .replace('<!-- LISTA_SALARIOS -->', lista)
      .replace('<!-- MAIOR_SALARIO -->', maior);

    res.send(htmlAtualizado);
  });
});

app.post('/adicionar', (req, res) => {
  const salario = parseFloat(req.body.salario);
  if (!isNaN(salario) && salario > 0) {
    salarios.push(salario);
    console.log(`Salário adicionado: R$ ${salario.toFixed(2)}`);
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});