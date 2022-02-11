const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, extensionAllow, field = '' ) => {

    return new Promise((resolve, reject) => { 
        
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { file } = files;
        const cutName = file.name.split('.')
        const extension = cutName[cutName.length - 1]

        if (!extensionAllow.includes(extension)) {
            return reject(`Error extension ${extension} isnt alowed, upload something like this ${extensionAllow}`)
        }

        const nameTemporary = uuidv4() + '.' + extension;

        uploadPath = path.join(__dirname, '../uploads/', field, nameTemporary);
        
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function(err) {
            if (err) {
                return reject(err)
            };
        
            resolve(uploadPath)
        })
    }) 
}

module.exports = uploadFile
