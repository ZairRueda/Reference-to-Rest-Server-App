// En este archivo crearemos las funciones y las exportaremos 

const { response, request } = require('express')
const bcryptjs = require('bcryptjs');
const { check } = require('express-validator')

// In thes cases, i put the first letter in uppercase because i can instans the result
const User = require('../models/user.model');
const { emailExist } = require('../helpers/db-validators.help');

//Route GET
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

// Route PUT
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

// Route POST
const usuariosPost = async(req = request, res = response) => {

    const { name, email, password, role } = req.body
    // If we want  get rest info  const { name, ...rest } = req.body
    const user = new User({ name, email, password, role })

    // Hash Password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password, salt)

    // For basic save the data
    await user.save()

    // Mandar con el estatuas
    res.json({
        user
    })
}

// Route DELETE
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

// Route PATCH
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