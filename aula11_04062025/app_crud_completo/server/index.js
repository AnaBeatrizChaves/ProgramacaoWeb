const express = require("express");
const app = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    port:3312,
    password:"",
    database:"crudalunos",

})

app.use(cors());
app.use(express.json());

app.post("/register",(req, res)=>{
   const {nome} = req.body;
   const {idade} = req.body;

   let SQL = "INSERT INTO alunos(nome,idade) VALUES (?,?)";

   db.query(SQL,[nome,idade],(err, result)=>{ //result - variaveis de ambiente
        console.log(err);

   })
});
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM alunos";

    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar alunos" });
        } else {
            res.json(result); // Enviar os dados dos alunos como resposta , veio do banco de dados
        }
    });
});
app.delete("/excluir/:id", (req, res) => {
    const alunoId = req.params.id;
  
    // Execute uma consulta SQL para excluir o aluno com base no ID
    const SQL = "DELETE FROM alunos WHERE id = ?";
    db.query(SQL, [alunoId], (err, result) => { //sempre usamos a chave primaria como parametro - QUERY é semelhante a preparement statement do java
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir aluno" });
      } else {
        res.json({ message: "Aluno excluído com sucesso" });
      }
    });
  });
  app.put("/editar/:id", (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade } = req.body;
  
    // Execute uma consulta SQL para atualizar os dados do aluno com base no ID
    const SQL = "UPDATE alunos SET nome = ?, idade = ? WHERE id = ?"; //funcao por referencia
    db.query(SQL, [nome, idade, alunoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao editar aluno" });
      } else {
        res.json({ message: "Aluno editado com sucesso" });
      }
    });
  });  
app.listen(3001,()=>{
    console.log("rodando servidor");
});
