const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth.controller')
const { validateFields } = require('../middlewares')

const router = Router()

router.post('/login', [
    check('email', 'Email is requiret').isEmail(),
    check('password', 'Password is requiret').not().isEmpty(),
    validateFields
],login)

router.post('/google', [
    check('id_token', 'id token is requiret').not().isEmpty(),
    validateFields
], googleSignIn)

module.exports = router