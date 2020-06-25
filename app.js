const express = require("express");
const db = require("./DB/connection");
const bodyParse = require("body-parser");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

//Body Parser
app.use(bodyParse.urlencoded({ extended: false }));

//DB connection
db.authenticate()
  .then(() => {
    console.log("Conectou com sucesso");
  })
  .catch((err) => {
    console.log("Ocorreu um erro ", err);
  });

//Routes
app.get("/", (req, res) => {
  res.send("Tudo funcionando 2");
});

//Jobs Routes
app.use("/jobs", require("./Routes/jobs"));
