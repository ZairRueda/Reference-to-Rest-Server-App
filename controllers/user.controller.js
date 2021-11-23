// En este archivo crearemos las funciones y las exportaremos 

const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    // Usar Query Params
    // La ventaja con la destructuracion es que nos permite crear valores por defout
    const {q, nombre = 'Andres', apikey} = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) => {

    // Caundo querramos nandar parametros HTTP
    // Ya habiendo agregado la variable al path 
    // express parsea el valor nos los entrega en el objeto reques
    const id = req.params.id

    res.json({
        msg: 'put API',
        id
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body

    // Mandar con el estatuas
    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}