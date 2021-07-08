'use strict'

// === Variables de importacion ===
var usuario = require('../modelos/usuarios.modelos');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

// === Funcion de Usuario por defecto ===
function usuarioAdmin(req, res) {
    var userModelo = new usuario();

    userModelo.nombre = 'ADMIN',
        userModelo.password = 'deportes123',
        userModelo.rol = 'ROL_ADMIN'

    usuario.find({

        $or: [
            { nombre: userModelo.nombre }
        ]
    }).exec((err, adminEncontrado) => {
        if (err) return consele.log('Error al crear el admin')

        if (adminEncontrado.length >= 1) {

            return console.log("El admin ya se creo")

        } else {
            bcrypt.hash('deportes123', null, null, (err, passwordEncriptada) => {

                userModelo.password = passwordEncriptada;


                userModelo.save((err, adminGuardado) => {

                    if (err) return console.log('error en la peticion del Admin')

                    if (adminGuardado) {
                        console.log('Admin Creado ')

                    } else {
                        console.log('Error al crear el Admin')
                    }
                })
            })
        }
    })

}

// === FUNCION AGREGAR USUARIOS ==
function agregarUsuario(req, res) {
    var usuarioModel = new usuario();
    var params = req.body;

    if(params.nombre && params.username && params.email && params.rol){
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.password = params.password;
        usuarioModel.rol = params.rol;
        usuarioModel.imagen = null;
        usuario.find({
            $or: [
                {username: params.username},
                {email: params.email}
            ]
        }).exec((err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "error en la peticion"});
            if(usuarioEncontrado && usuarioEncontrado.length >=1){
                return res.status(500).send({mensaje: "el usuario ya existe"});
            }else{
                bcrypt.hash(params.password, null, null, (err, encryptacion)=>{
                    usuarioModel.password = encryptacion;
                    
                    usuarioModel.save((err, usuarioGuardado)=>{
                        if(err) res.status(500).send({mensaje: "error en la peticion"});
                        if(!usuarioGuardado){
                            return res.status(401).send({mensaje: "No se pudo guardar"});
                        }
                        return res.status(200).send({usuarioGuardado})
                    })
                    
                }) 
            }
        })

    }else{
        return res.status(500).send({mensaje: "debe llenar todos los campos"})
    }
    
}


function obtenerUsuarios(req, res){
    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje:'Solo el rol tipo ROL_ADMIN puede ver los usuarios'});
    }

    usuario.find().exec((err, usuarios)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de obtener los usuarios'});
        if(!usuarios) return res.status(500).send({mensaje: 'Error en la consulta de usuarios o no tiene datos ingresados'});

        return res.status(200).send({usuarios});
    })
}

function buscarUsuario(req, res) {
    var params = req.body

    usuario.findOne({ nombre: params.nombre }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'No existe ningun usuario en la base de datos' });
        if (usuarioEncontrado) return res.status(200).send({ usuarioEncontrado })
    })
}

function buscarUsuarioID(req, res){
    var usuarioId = req.params.idUsuario;

    usuario.findById(usuarioId,(err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!usuarioEncontrado) return res.status(500).send({mensaje:'Error al buscar el usuario'});

        return res.status(200).send({usuarioEncontrado});
    })
}

// === Funcion Login === 
function login(req, res) {
    var params = req.body;

    usuario.findOne({ email: params.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passvVerificada) => {
                if (passvVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'El usuario no se ha podido identificar' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'Erro al buscar el usuario' });
        }
    })
}

// === FUNCION EDITAR USUARIO ===
function editarUsuario(req, res) {
    var params = req.body;
    var idUsuario = req.params.id;

    usuario.findByIdAndUpdate(idUsuario, params, {new:true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuarioEditado){
            res.status(500).send({mensaje: "no se pudo editar el usuario"});
        }
        
        return res.status(200).send({usuarioEditado})
    })
    
}



// === FUNCION DE ELIMINAR USUARIO ===
function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo el administrador puede eliminar un usuario.' });
    }

    usuario.findByIdAndDelete(idUsuario, (err, usuaiorEliminado) => {
        if (err) {
            return res.status(500).send({ mensaje: 'Error en la peticion de eliminar un usuario' });
        }

        if (!usuarioEliminado) {
            return res.status(500).send({ mensaje: 'Error al eliminar el usuario' });
        }

        return res.status(200).send({ usuarioEliminado });
    })
}

module.exports = {
    usuarioAdmin,
    agregarUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    login,
    buscarUsuario,
    buscarUsuarioID,
    editarUsuario 
}