const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

// A middelware need them three arguments request, response and next 
const jwtValidate = async( req, res = response, next) => {

    // Read Headers
    // for read the header we need bring a request
    // x-token is a name worn whit the frontend or headers
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:"there are not json web token "
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        // on case of been undefine
        if(!user) {
            return res.status(401).json({ 
                msg: "is undefine - token is not valid"
            })
        }

        // Validate if user is not a user deleted
        if(!user.state) {
            return res.status(401).json({ 
                msg: "user is deleted - token is not valid"
            })
        }

        req.user = user
        
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token is not valid"
        })
    }

    // console.log(token)

}

module.exports = {
    jwtValidate
}