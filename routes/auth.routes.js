const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos.middle')

const router = Router()

router.post('/login', [
    check('email', 'Email is requiret').isEmail(),
    check('password', 'Password is requiret').not().isEmpty(),
    validarCampos
],login)

module.exports = router