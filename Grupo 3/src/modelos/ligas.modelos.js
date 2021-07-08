'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var ligasSchema = Schema({
    noEquipo: String,
    nombre: String,
    descripcion: String,
    equipos: [{
        nombreEquipo: String,
        imagenEquipo: String
    }]
});

module.exports = moongose.model("ligas", ligasSchema);


/*
        

*/