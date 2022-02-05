const { Router } = require('express')
const { check } = require('express-validator')
const { 
    usersGet, 
    usersPut, 
    usersPost,
    usersDelete,
    usersPatch
} = require('../controllers/user.controller')

const { 
    isRoleValidate, 
    isThereEmail, 
    isThereIdInDB 
} = require('../helpers')

const { 
    jwtValidate,
    validateFields,
    isAdminRole, 
    haveARole
} = require('../middlewares')

const router = Router()

// This code isn't scalable, because it's all together
router.get('/', usersGet)

// If we want send an argument, we need put it up after this " : "
router.put('/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(isThereIdInDB),
    check('role').custom(isRoleValidate),
    validateFields
], usersPut)

// define a middleware, it,s the second parameter
// if you want only middel, you have to write single < , somenamemiddel , >
// but if you want, some middle, you have to write an array
// 
router.post('/', [
    // If you need deny a function you want to use function .not()
    check('name', 'Name is several requiret').not().isEmpty(),
    check('password', 'Password is several requiret and must have 6 letters').isLength({min: 6}),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(isThereEmail),
    // check('role', 'Its not a validate Role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValidate),
    validateFields
], usersPost)

// TODO in the last class i see the validation of all parametters

router.delete('/:id',[
    jwtValidate,
    // isAdminRole,
    haveARole('ADMIN_ROLE', 'SELLER_ROLE'),
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(isThereIdInDB),
    validateFields
], usersDelete)

router.patch('/', usersPatch)


module.exports = router