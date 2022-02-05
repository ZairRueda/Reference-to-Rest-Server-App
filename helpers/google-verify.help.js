const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken) => {
    // console.log(idToken, "hola aqui");
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID ,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

  
    
    //  if a variable do not have a name equal to our variable, we can rename whit pre-var : our-var
    const {
        name,
        picture: img,
        email
    } = ticket.getPayload();
    //   const userid = payload['sub'];

    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    // console.log(name, img, email);
    return { name , img, email }
}

// verify().catch(console.error);
module.exports = googleVerify