'use strict'

const { Router } = require("express");
var express = require("express");
var usuarioController = require("../controladores/usuario.controlador");


//MIDDLEWARES

var md_aurotization = require("../middlewares/authenticated")

//RUTAS

var api = express.Router();
api.get('/eliminarUsuario/:idUsuario', usuarioController.eliminarUsuario);
api.post('/login', usuarioController.login);
api.get('/usuarioAdmin', usuarioController.usuarioAdmin);

module.exports = api;