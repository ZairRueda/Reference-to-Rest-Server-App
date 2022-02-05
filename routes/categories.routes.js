const { Router } = require('express')
const { check } = require('express-validator')
const { 
    categoriesPost, 
    categoriesGet, 
    categoriesGetById,
    categoriesPut,
    categoriesDelete
} = require('../controllers/categories.controller')

const { 
    verifyIdCategory,
    jwtValidate, 
    isAdminRole,
    validateFields
} = require('../middlewares')

const router = Router() 

/* Ejemplo URL
 * {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', categoriesGet)

// Obtener una categoria por ID - publico
router.get('/:id', [
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdCategory),
    validateFields
], categoriesGetById)

// Crear categoria - Privado - cualquiera con un toquen valido
router.post('/', [
    jwtValidate,
    check('name', 'The Name is required').not().isEmpty(),
    validateFields
], categoriesPost)

// Actializar - Privado - Cualquiera con toquen valido
router.put('/:id', [
    jwtValidate,
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdCategory),
    check('name', 'The Name is required').not().isEmpty(),
    validateFields
], categoriesPut)

// Borrar una categoria - Administrador
router.delete('/:id', [
    jwtValidate,
    isAdminRole,
    check('id', 'Is not a validate id ').isMongoId(),
    check('id').custom(verifyIdCategory),
    validateFields
], categoriesDelete)

module.exports = router