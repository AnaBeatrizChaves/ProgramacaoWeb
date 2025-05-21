const express = require("express");
const app = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors")


const db = mysql.createPool({
    host:"localhost",
    port:3312,
    user:"root",
    password:"",
    database:"crudalunos",
})

app.use(cors());
app.use(express.json());

app.post("/register",(req, res)=>{
    const {nome} = req.body;
    const {idade} = req.body;
 
    let SQL = "INSERT INTO alunos(nome,idade) VALUES (?,?)";
    
    db.query(SQL,[nome,idade],(err, result)=>{
         console.log(err);
    })
 });

app.listen(3001,()=>{
    console.log("rodando servidor");
});