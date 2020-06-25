const express = require("express");
const router = express.Router();
const Job = require("../Models/Job");

//Rota de teste
router.get("/test", (req, res) => {
    res.send("Deu certo");
});

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