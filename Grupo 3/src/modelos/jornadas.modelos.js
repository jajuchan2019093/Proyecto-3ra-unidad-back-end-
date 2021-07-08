'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var jornadasSchema = Schema({
 
    nombre: String,
    equipos: [{
        nombre: String,
        logo: String
        
    }],
    marcador: String,
    golesencontra: String,
    golesafavor: String,
   



});

module.exports = moongose.model("jornadas", jornadasSchema);
