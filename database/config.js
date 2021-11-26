const mongoose = require('mongoose')


const dbConnection = async() => {

    // Al no tener el control absoluto usamos Try-Catch
    try {
        await mongoose.connect( process.env.MONGODB_ATLAS);

        console.log('Base de datos online');
    } catch (e) {
        console.log(e);
        throw new Error('Error al iniciar base de datos')
    }


}

module.exports = {
    dbConnection
}