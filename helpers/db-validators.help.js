const Role = require('../models/role.model')
const User = require('../models/user.model')

const isRoleValidate = async(role = '') => {
    const existeRole = await Role.findOne({role})
    if (!existeRole) {
        throw new Error(`This role ${role} its not before registred`)
    }
}

const emailExist = async(email) => {
    // If email exist
    const existEmail = await User.findOne({email})

    if (existEmail) {
        throw new Error(`This mail ${email} was before register`)
        // return res.status(400).json({
        //     msg: 'This mail was before register'
        // })
    }
}

module.exports = {
    isRoleValidate,
    emailExist
}