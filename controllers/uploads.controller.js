const { response } = require("express");
const { uploadFile } = require("../helpers");
const {User, Product} = require("../models")

const loadField = async(req, res = response) => {
    const  extensionAlow = ['jpg','png']
    try {
        const name = await uploadFile(req.files,  extensionAlow, 'img')
        res.json({name})
    } catch (msg) {
        res.status(400).json({msg})
    }
}
const updateField = async(req, res = response) => {
    const {collection, id} = req.params
    const  extensionAlow = ['jpg','png']
    let model
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: 'User not found'
                })
            }
        break
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: 'Product not found'
                })
            }
        break
        default:
            return res.status(500).json({msg: 'I forgot to validate this'})
    }
    const name = await uploadFile(req.files,  extensionAlow, collection)
    model.img = name
    await model.save()
    res.json({model})
}
module.exports = { 
    loadField,
    updateField
}