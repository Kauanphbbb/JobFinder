const express = require("express");
const exphbar = require("express-handlebars");
const path = require("path");
const db = require("./DB/connection");
const bodyParse = require("body-parser");
const Job = require("./Models/Job");
const { query } = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

//Body Parser
app.use(bodyParse.urlencoded({ extended: false }));

//Handle bars
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbar({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static folder
app.use(express.static(path.join(__dirname, "public")));

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
  let search = req.query.job;
  let query = "%"+search+"%" //PH ==> PHP
  if (!search) {
    Job.findAll({ order: [["createdAt", "DESC"]] })
      .then((jobs) => {
        res.render("index", {
          jobs,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Job.findAll({ 
      where: {title: {[Op.like]: query}},
      order: [
        ["createdAt", "DESC"]
      ]})
      .then((jobs) => {
        res.render("index", {
          jobs, search
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Jobs Routes
app.use("/jobs", require("./Routes/jobs"));
