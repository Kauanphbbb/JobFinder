const express = require("express");
const router = express.Router();
const Job = require("../Models/Job");

//Rota de teste
router.get("/test", (req, res) => {
  res.send("Deu certo");
});

//form da rota de envio
router.get("/add", (req, res) => {
  res.render("add");
});

//detalhes da vaga
router.get("/view/:id", (req, res) => Job.findOne({
  where: {
    id: req.params.id
  }
}).then(job => {

  res.render("view", {
    job
  })
}).catch(err => {
  console.log(err);
}));

//add job via post
router.post("/add", (req, res) => {
  let { title, salary, company, description, email, newJob } = req.body;
  //insert
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    newJob,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
