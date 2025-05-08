import logo from './logo.svg';
import './App.css';
import {UseState, useState} from'react';
import Vendas from './components/Vendas';

function App() {

  return ( 
  
    <div className="App">
      <header className="App-header">
  
    <Vendas></Vendas></header>
     
     <p/><p/>
       <div>
         <span>Bem vindo {user.nome}</span>
         <span>Email: {user.email}</span>

       </div>
    </div>
    
  );

}
export default App;