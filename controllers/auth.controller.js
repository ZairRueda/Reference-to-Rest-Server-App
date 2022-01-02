const { response, json } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')
const { makeJWT } = require('../helpers/make-jwt.help')
const { googleVerify } = require('../helpers/google-verify.help')

const login = async(req, res = response) => {

    const { email, password } = req.body


    try {

        // Steps
        // Verify if email is exist
        // .findOne is a property  of 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'User / password is not true - email'
            })
        }

        // Verify if user is active
        // Because if user state is false, this user can't login at the app
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User / password is not true - state : false'
            })
        }

        // Verify the password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / password is not true - password'
            })
        }


        // Make a JWT
        const token = await makeJWT(user.id)


        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Talk to the admin'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    const googleUser = await googleVerify(id_token)

    console.log(googleUser);

    try {
        res.json({
            msg: 'Todo Ok! Google SignIn',
            googleUser
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token by google is not recognized '
        })
    }

}

module.exports = {
    login,
    googleSignIn
}