const { Router } = require('express')
const { check } = require('express-validator')
const { 
    loadField,
    updateField
} = require('../controllers/uploads.controller')
const { collectionAllow } = require('../helpers')
const { validateFields } = require('../middlewares')

const router = Router()

router.post('/', [], loadField)

router.put('/:collection/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('collection').custom( c => collectionAllow(c, ['users', 'products'])),
    validateFields
], updateField)

module.exports = router