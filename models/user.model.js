/* User Structure

En mongo a diferencia de las baces relacionales se guarda en forma de objetos (o documentos)
y estos se guarda en corecciones (tablas)

{
    nombre: 'Correo',
    correo: 'correo@correo.com',
    password: 'jnasd834299hjw23791',
    imagen: 'public/img/imagen.jpg',
    role: '9292828348',
    estado: false,
    google: false
}

estado : si el usuario esta auteenticado
google : si el usuario fue agregado por medio de google
*/

const { Schema, model } = require('mongoose');

// Model
const UserSchema = Schema({
    // Object literal - Structure of properties
    // the valiadate here is not a optimal
    name: {
        type: String,
        required: [true, 'The Name is requiret']
    },
    email: {
        type: String,
        required: [true, 'The email is requiret'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is requiret']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

// For remove a password and version
UserSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario
}

// We export a function of model
module.exports = model('User', UserSchema);