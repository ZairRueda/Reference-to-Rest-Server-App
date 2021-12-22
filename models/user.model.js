/* User Structure

En mongo a diferencia de las baces relacionales se guarda en forma de objetos (o documentos)
y estos se guarda en corecciones (tablas)

{
    name: 'something',
    email: 'email@email.com',
    password: 'jnasd834299hjw23791',
    img: 'public/img/img.jpg',
    role: '9292828348',
    state: false,
    google: false
}

estate : if the user is authenticated
google : if the user is make whit google
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

// For remove a password and version when we require a user
// this model modify all structure of user Schema when we want a request
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}

// We export a function of model
module.exports = model('User', UserSchema);