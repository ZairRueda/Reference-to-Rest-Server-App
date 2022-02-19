const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL)

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

// If we want to upload a file but save it in local server
/* const updateField = async(req, res = response) => {
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

    console.log(req.model);

    // Clean our before img
    if (model.img) {
        // We need to delete the image in the server
        const pathImg = path.join(__dirname, '../uploads', collection, model.img)

        // If to exists, we do delete
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }

    const name = await uploadFile(req.files,  extensionAlow, collection)
    model.img = name
    await model.save()
    res.json({model})
} */


// Save Files in Clopudinary Cloud Api
const updateFieldCloudinary = async(req, res = response) => {
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

    // Debugger 
    // console.log(req.files.file);

    // Clean our before img
    if (model.img) {
        const nameArr = model.img.split('/')
        const name = nameArr[nameArr.length - 1]
        const [public_id] = name.split('.')

        cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.file
    // When we upload a file we have a temporal file, this's we send to cloudinary
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath )

    model.img = secure_url
    await model.save()

    res.json({model})
}

// === See file ===
const getFile = async(req, res = response) => {
    
    // Colection : String Id : Number
    const {collection, id} = req.params
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

    // Clean our before img
    if (model.img) {
        // We need to delete the image in the server
        const pathImg = path.join(__dirname, '../uploads', collection, model.img)

        // If to exists, we do delete
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }

    } 

    if (!model.img || model.img === '') {
        const pathNonImg = path.join(__dirname, '../assets', 'no-img.jpg')

        return res.sendFile(pathNonImg)
    }
    
}


module.exports = { 
    loadField,
    // updateField,
    updateFieldCloudinary,
    getFile
}