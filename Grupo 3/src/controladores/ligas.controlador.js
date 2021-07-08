'use strict'

var Ligas = require('../modelos/ligas.modelos');

function ejemplo(req, res) {
    if (req.user.rol === "ROL_USUARIO") {
        res.status(200).send({ mensaje: `Hola mi nombre es: ${req.user.nombre}` })
    } else {
        res.status(400).send({ mensaje: 'Solo el rol de tipo usuario puede acceder' })
    }

}

function agregarLigas(req, res){
    var ligasModel = new Ligas();
    var params = req.body;
    
    if(params.nombre){
        ligasModel.nombre = params.nombre;
        ligasModel.autor = req.user.nombre;

        ligasModel.save((err, ligaGuardada)=>{
            if(err) return res.status(500).send({mensakje: 'Error en la peticion de la Liga'})
            if(!ligaGuardada) return res.status(500).send({mensaje: 'Error al agregar la liga'})
        
            return res.status(200).send({ligaGuardada});
        })
    }
}

function obtenerLigas(req,res){

    Ligas.find().exec((err, ligas)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de obtener las ligas'})
        if(!ligas) return res.status(500).send({mensaje:'No existen ligas para mostrar'});
        
        return res.status(200).send({ligas});
    })
}

function obtenerLigasID(req, res) {
    var ligasId = req.params.idLigas;

    Ligas.findById(ligasId, (err, ligaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Liga' });
        if (!ligaEncontrada) return res.status(500).send({ mensaje: 'Error al obtener La Liga' });
        return res.status(200).send({ ligaEncontrada });
    })
}
function editarLigas(req,res){
    var params = req.body;
    var idLiga = req.params.id
    var idUsuario = req.params.idUsuario;


    if (idUsuario != req.user.sub) {
        return res.status(500).send({ mensaje: 'No posee los permisos para editar las ligas de otros usuarios' });
    }

    Ligas.find({nombre: params.nombre}).exec((err,ligaEncontrada)=>{
        if (err) return res.status(500).send({Mensaje: 'Error en la peticion'});
    
        if(ligaEncontrada && ligaEncontrada.length >= 1){
            return res.status(500).send({mensaje: 'El nombre ya esta en uso'})
        }else{
            
            Ligas.findOne({ _id: idLiga}).exec((err,ligaEncontrada ) =>{
                if(err) return res.status(500).send({ Mensaje: 'Error en la peticion que desea'});

                if(!ligaEncontrada) return res.status(500).send({ Mensaje: 'No existen los datos '});

                    Ligas.findByIdAndUpdate(idLiga)
            })
        }
    })

}

function eliminarLigas(req, res){
    var idLigas = req.params.id
    /*var idUsuario = req.params.idUsuario;*/


    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar las ligas de otros usuarios' });
    }
    
  
    Ligas.findByIdAndDelete(idLigas, ((err, ligaEliminada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!ligaEliminada) return res.status(500).send({ mensaje: 'No se a podido eliminar la liga' });

        return res.status(200).send({ligaEliminada})
    }))
    
}




function agregarEquipos(req, res){
    var params = req.body;
    var idLiga = req.params.id;

    Ligas.findByIdAndUpdate(idLiga, { $push: { equipos: { nombreEquipo: params.nombreEquipo, imagenEquipo: params.imagenEquipo}}},
        {new: true}, (err, equipoAgregado)=>{
           
            return res.status(200).send({equipoAgregado: equipoAgregado})
        })
}

function obtenerEquipos(req, res) {
    var idLigas = req.params.id;
    Ligas.findById(idLigas, { equipos: 1 }, (err, equiposObtenidos)=>{
        return res.status(200).send({ equiposObtenidos: equiposObtenidos});
    })
}

function editarEquipos(req, res){
    var ligaID = req.params.idLiga;
    var equipoID = req.params.idEquipo;
    var params = req.body;
    var datosPorActualizar = {};

    if(params.nombreEquipo) datosPorActualizar['equipos.$.nombreEquipo'] = params.nombreEquipo;

    Ligas.findOneAndUpdate( {_id: ligaID, "equipos._id": equipoID}, datosPorActualizar, {new: true},
    (err, equipoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion del Equipo' });
        if(!equipoActualizado) return res.status(500).send({mensaje: 'Error al editar el equipo'});

        return res.status(200).send({ equipoActualizado });
    })
}

function eliminarEquipo(req, res){
    var idEquipoLiga = req.params.idEquipo;

    Ligas.findOneAndUpdate({ "equipos._id": idEquipoLiga }, { $pull: { equipos: { _id: idEquipoLiga } } }, {new: true},
    (err, ligaActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de comentario' });
        if(!ligaActualizada) return res.status(500).send({ mensaje: 'Error al eliminar el Comentario' });

        return res.status(200).send({ ligaActualizada })
    })
}



module.exports = {
    agregarLigas,
    obtenerLigas,
    obtenerLigasID,
    editarLigas,
    eliminarLigas,
    ejemplo,
    agregarEquipos,
    obtenerEquipos,
    editarEquipos,
    eliminarEquipo
}