const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos.middle')

const router = Router()

router.post('/login', [
    check('email', 'Email is requiret').isEmail(),
    check('password', 'Password is requiret').not().isEmpty(),
    validarCampos
],login)

router.post('/google', [
    check('id_token', 'id token is requiret').not().isEmpty(),
    validarCampos
], googleSignIn)

module.exports = router