const { Router } = require('express')
const { check } = require('express-validator')
const { 
    loadField,
    updateField,
    getFile,
    updateFieldCloudinary
} = require('../controllers/uploads.controller')
const { collectionAllow } = require('../helpers')
const { 
    validateFields, 
    validateFilesIsntEmpty 
} = require('../middlewares')

const router = Router()

router.post('/', [
    validateFilesIsntEmpty,
    validateFields
], loadField)

router.put('/:collection/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('collection').custom( c => collectionAllow(c, ['users', 'products'])),
    validateFilesIsntEmpty,
    validateFields
], updateFieldCloudinary)

router.get('/:collection/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('collection').custom( c => collectionAllow(c, ['users', 'products'])),
    validateFields
], getFile)

module.exports = router