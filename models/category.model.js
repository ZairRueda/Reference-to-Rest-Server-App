const { Schema, model} = require('mongoose')


const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is requiret'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true 
        // Require nos sirve para hacer mas preciso el que default sea True y debe de existir un estado
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

CategorySchema.methods.toJSON = function() {
    const {__v, state, ...data} = this.toObject()

    return data
}

module.exports = model( 'Category', CategorySchema )