// En este archivo crearemos las funciones y las exportaremos 

const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

// In thes cases, i put the first letter in uppercase because i can instans the result
const User = require('../models/user.model');
const { emailExist } = require('../helpers/db-validators.help');

//Route GET
const usuariosGet = async(req = request, res = response) => {

    // Usar Query Params
    // La ventaja con la destructuracion es que nos permite crear valores por defout
    // const {q, nombre = 'Andres', apikey} = req.query

    //Destructuring Request dot query
    const { limit = 5, from = 5} = req.query
    const query = {state: true}

    
    // Get all users 
    // If we wanth olways the items which have state on true, we need add a conditional
    // In this point we have {state: true}
    const users = await User.find(query)
        // jump to any position infront of object
        .skip(parseInt(from))
        // limit at quantity of objects to get
        .limit(parseInt(limit))

    const total = await User.countDocuments(query)
    

    res.json({
        total,
        users
    })
}

// Route PUT
const usuariosPut = async(req, res = response) => {

    // Get value of element received in frontend
    const { id } = req.params

    const { _id, password, google, ...rem } = req.body

    
    // TODO validate on data bases
    if (password) {
        // Hash Password
        const salt = bcryptjs.genSaltSync(10)
        rem.password = bcryptjs.hashSync(password, salt)
    }

    // .findByIdAndUpdate is a fuction of mongo
    const user = await User.findByIdAndUpdate( id, rem )

    res.json(user)
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