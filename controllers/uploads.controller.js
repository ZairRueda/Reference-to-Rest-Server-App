const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadField = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({
            msg:'No files were uploaded.'
        });
    }

    const  extensionAlow = ['jpg','png']

    try {

        const name = await uploadFile(req.files,  extensionAlow, 'img')
    
        res.json({name})
        
    } catch (msg) {
        res.status(400).json({msg})
    }
    
}

const updateField = (req, res = response) => {

    const {collection, id} = req.params

    res.json({
        collection,
        id
    })
}

module.exports = { 
    loadField,
    updateField
}