require('dotenv').config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json()); //para receber respostas em formato de texto
app.use(express.urlencoded({ extended: false })); // para aceitar form data

//Routes
const router = require('./routes/Router.js')
app.use(router)

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
