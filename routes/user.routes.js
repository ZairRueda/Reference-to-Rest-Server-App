const { Router } = require('express')
const { check } = require('express-validator')
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/user.controller')
const { isRoleValidate, isThereEmail, isThereIdInDB } = require('../helpers/db-validators.help')
const { validarCampos } = require('../middlewares/validar_campos.middle')

const router = Router()

// Este codigo no es escalable, esta todo junto
router.get('/', usuariosGet)

// Si queremos pasarle un argumento al path se agrega despues de :
router.put('/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(isThereIdInDB),
    check('role').custom(isRoleValidate),
    validarCampos
], usuariosPut)

// define a middleware, it,s the second parameter
// if you want only middel, you have to write single < , somenamemiddel , >
// but if you want, some middle, you have to write an array
// 
router.post('/', [
    // If you want deny a function you want to use function .not()
    check('name', 'Name is several requiret').not().isEmpty(),
    check('password', 'Password is several requiret and must have 6 letters').isLength({min: 6}),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(isThereEmail),
    // check('role', 'Its not a validate Role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValidate),
    validarCampos
],usuariosPost)

// TODO in the last class i see the validation of all parametters

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router