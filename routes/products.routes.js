const { Router } = require('express')
const { check } = require('express-validator')
const { 
    productsPost, 
    productsGet, 
    productsGetById,
    productsPut,
    productsDelete
} = require('../controllers/products.controller')

const { verifyIdProduct } = require('../helpers/product-validators.help')

const { 
    jwtValidate, 
    isAdminRole 
} = require('../middlewares')

const { validateFields } = require('../middlewares')

const router = Router() 

/* Ejemplo URL
 * {{url}}/api/categorias
*/

// Get it all products - public
router.get('/', productsGet)

// Get It product by ID - public
router.get('/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdProduct),
    validateFields
], productsGetById)

// Make a product - Privado - cualquiera con un toquen valido
router.post('/', [
    jwtValidate,
    check('name', 'The Name is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validateFields
], productsPost)

// Update Product - Privado - Cualquiera con toquen valido
router.put('/:id', [
    jwtValidate,
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdProduct),
    check('name', 'The Name is required').not().isEmpty(),
    validateFields
], productsPut)

// Delete Product - Administrador
router.delete('/:id', [
    jwtValidate,
    isAdminRole,
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdProduct),
    validateFields
], productsDelete)

module.exports = router