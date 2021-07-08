'use strict'

//variables globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')

//importacion de rutas
var usuario_rutas = require("./src/rutas/usuario.rutas");
var jornadas_rutas = require("./src/rutas/jornadas.rutas");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cabezeras
app.use(cors());



//aplicacion de rutas
app.use('/api', usuario_rutas, jornadas_rutas);


//exportar
module.exports = app;