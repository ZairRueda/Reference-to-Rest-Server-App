const { Router } = require('express')
const { check } = require('express-validator')
const { loadField } = require('../controllers/uploads.controller')
const { validateFields } = require('../middlewares')

const router = Router()

router.post('/', [], loadField)

module.exports = router