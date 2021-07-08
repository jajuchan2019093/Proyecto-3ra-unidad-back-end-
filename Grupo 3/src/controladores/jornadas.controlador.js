'use strict'
//
var jornadas = require('../modelos/jornadas.modelos');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt")

function agregarJornada(req,res){
 var jornadaModelo = new jornadas();
 var params = req.body;

 if(req.user.rol !="ROL_ADMIN"){
    return res.status(500).send({mensaje:'No posee los permisos para agregar jornadas.'});
 }


if(params.nombre && params.marcador && params.golesencontra && golesafavor){
    jornadaModelo.nombre = params.nombre;
    jornadaModelo.marcador = params.marcador;
    jornadaModelo.golesencontra = params.golesencontra
    jornadaModelo.golesafavor = params.golesafavor

    jornadas.find({
        $or:[
            {nombre: jornadaModelo.nombre}
        ]
    }).exec((err, jornadaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"})
        if(jornadaEncontrada && jornadaEncontrada.length>=1){
            res.status(401).send({mensaje: "La liga ya existe"})

        }else{
            jornadaModelo.save((err, guardarJornada)=>{
                if(err) return res.status(500).send({mensaje: "error al guardar la liga"});

                if(!guardarJornada){
                    return res.status(500).send({mensaje: "No existe la jornada"});
                }
                return res.status(200).send({guardarJornada});
            })
        }
    })
}


}

function agregarEquipos( req, res){
    var params = req.body;
    var idjornada = req.params.id;
    var jornadaModelo = new jornadas();
    
    
    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({mensaje: 'No posee los permisos para Agregar Equipos'})
    }
    jornadas.findByIdAndUpdate(idjornada,{$push: {equipos:{ nombreEquipo: params.nombreEquipo}}},
        {new: true}, (err, equipoAgregado)=>{
            return res.status(200).send({equipoAgregado: equipoAgregado});
        } 
        )
}

module.exports={
    agregarJornada,
    agregarEquipos
}
