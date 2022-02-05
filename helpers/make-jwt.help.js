const jwt = require('jsonwebtoken')


const makeJWT = ( uid = '') => {
    
    return new Promise( (res, rej) => {

        const payload = { uid }

        // jwt require tree params, first the payload or uid, and second the secret key, 
        // and third, in this we have add option, how the timer
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '30m'
        }, (err, token) => {

            // If we have a mistake
            if (err){
                console.log(err);
                rej('Is not possibly make a JWT')
            } else {
                res(token)
            }
        })

    })

}

module.exports = makeJWT
