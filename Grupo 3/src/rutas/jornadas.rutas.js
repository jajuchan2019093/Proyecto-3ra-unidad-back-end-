'use strict'

var express = require("express");
var jornadaControlador = require("../controladores/jornadas.controlador");

var md_autorization = require("../middlewares/authenticated");

var api = express.Router();
api.post('/agregarJornada',md_autorization.ensureAuth, jornadaControlador.agregarJornada);
api.put('/agregarEquipos', md_autorization.ensureAuth, jornadaControlador.agregarEquipos);

module.exports = api;