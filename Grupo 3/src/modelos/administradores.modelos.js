'use strict'

// === VARIABLES DE IMPORTACION ===
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdministradorSchema = Schema({
    nombre: String,
    username: String,
    email: String,
    password: String,
    rol: String,
    image: String
})

module.exports = mongoose.model('administradores', AdministradorSchema);