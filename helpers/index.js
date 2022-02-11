const isRoleValidate = require('./db-validators.help')
const isThereEmail = require('./db-validators.help')
const isThereIdInDB = require('./db-validators.help')
const collectionAllow = require('./db-validators.help')

const googleVerify = require('./google-verify.help')
const makeJWT = require('./make-jwt.help')
const uploadFile = require('./upload-file.help')


module.exports = {
    isRoleValidate,
    isThereEmail,
    isThereIdInDB,
    googleVerify,
    makeJWT,
    uploadFile,
    ...collectionAllow
}