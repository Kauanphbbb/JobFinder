const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Rodando na porta 3000");
});

app.get("/", (req, res) => {
    res.send("Tudo funcionando 2");
});