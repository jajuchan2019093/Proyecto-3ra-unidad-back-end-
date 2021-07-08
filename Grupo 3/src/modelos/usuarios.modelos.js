'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var usuariosSchema = Schema({
    nombre: String,
    username: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
});

module.exports = moongose.model("usuarios", usuariosSchema);