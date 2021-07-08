'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var partidosSchema = Schema({
 
    
    equipos:[{
        nombre: String,
        logo: String,
        
    }],




});

module.exports = moongose.model("partidos", partidosSchema);

