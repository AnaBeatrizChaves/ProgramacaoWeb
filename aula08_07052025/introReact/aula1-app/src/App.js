import logo from './logo.svg';
import './App.css';
import Mensagem from './components/Mensagem';
import { UseState, useState } from 'react';

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  //criando um objeto para receber os dados do formulario e passalo para ser impresso
  // ou seja para manipula-lo da maneira que achar melhor
  const [user, setUser] = useState({});// inicia vazio para receber os valores

  // criando a função a ser chamada no form
  function registrar(e) {
    e.preventDefault();// serve para nao dar o post no form sem valores digitados
    //alert("registrando dados");
    setUser({
      nome: nome,
      email: email,

    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={registrar} className="w-50 mx-auto mt-5">
    
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>

        <div className="mt-4">
          {user.nome && (
            <div className="alert alert-success">
              <p><strong>Bem-vindo, {user.nome}!</strong></p>
              <p>Email: {user.email}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;