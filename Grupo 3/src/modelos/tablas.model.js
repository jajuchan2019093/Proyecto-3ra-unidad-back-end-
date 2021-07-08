'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var tablaSchema = mongoose.Schema({

    equipos:[{
        nombreEquipo: String
    }],
    jornadas:[{
        marcador: String,
        golesencontra: String,
        golesafavor: String,
    }],

})
module.exports = moongose.model("tabla", tablaSchema);