'use strict'

var tablas = require('../modelos/tablas.model');

function asignarpuntos(req, res){

    var params = req.body;
    var sumarId = req.params.Id;
    var puntos = Number(params.puntos);

    suma.findByIdAndUpdate(sumarId, {$inc:{marcador: puntos}}, {new: true}, (err, sumaEditadas)=>{
        return res.status(200).send({ sumaEditadas: sumaEditadas})
    })

}

module.exports={
    asignarpuntos
}