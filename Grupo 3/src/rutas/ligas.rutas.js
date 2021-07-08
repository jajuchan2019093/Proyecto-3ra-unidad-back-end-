'use strict'

var express = require("express");
var ligaControlador = require("../controlador/ligas.controlador");

var md_autorization = require("../middlewares/authenticated");

var api = express.Router();
api.post('/agrgarLigas', md_autorization.ensureAuth, ligaControlador.agregarLigas);
api.get('/visualizarLigas', md_autorization.ensureAuth, ligaControlador.visualizarLigas);
api.put('/agregarEquipos', md_autorization.ensureAuth, ligaControlador.agregarEquipos);
api.put('/editarLigas', md_autorization.ensureAuth, ligaControlador.editarLigas);
api.delete('/eliminarLigas', md_autorization.ensureAuth, ligaControlador.eliminarLigas);



module.exports = api;