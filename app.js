const express = require("express");
const db = require("./DB/connection");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Rodando na porta 3000");
});

//DB connection
db
.authenticate()
.then(() => {
    console.log("Conectou com sucesso")
})
.catch(err => {
    console.log("Ocorreu um erro ", err)
});

//Routes
app.get("/", (req, res) => {
    res.send("Tudo funcionando 2");
});