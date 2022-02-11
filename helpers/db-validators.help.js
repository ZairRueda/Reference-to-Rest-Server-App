const Role = require('../models/role.model')
const User = require('../models/user.model')

const isRoleValidate = async(role = '') => {
    const thereRole = await Role.findOne({role})
    if (!thereRole) {
        throw new Error(`This role ${role} its not before registred`)
    }
}

const isThereEmail = async(email = '') => {
    // If email exist
    const  thereEmail = await User.findOne({email})

    if ( thereEmail) {
        throw new Error(`This mail ${email} was before register`)
    }
}

const isThereIdInDB = async(id = '') => {
    const thereUser = await User.findById(id)

    if ( !thereUser) {
        throw new Error(`The user with this id is not there`)
    }
}

const collectionAllow = (collection = '', allowedCollections = []) => {

    const allowed = allowedCollections.includes(collection)

    if(!allowed) {
        throw new Error(`The collection with this Name ${collection} is not allowed`)
    }

    return true
}

module.exports = {
    isRoleValidate,
    isThereEmail,
    isThereIdInDB,
    collectionAllow
}