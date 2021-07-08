'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'jajuchan-2019093'

exports.createToken = function (usuario){
    var payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
        rol: usuario.rol,
        iat:moment().unix(),
        exp: moment().day(30,'days').unix()


    }

    return jwt.encode(payload,secret)
}