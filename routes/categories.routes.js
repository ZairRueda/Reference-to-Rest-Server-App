const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.middle')

const router = Router() 

/* Ejemplo URL
 * {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get')
})

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
    res.json('get - id')
})

// Crear categoria - Privado - cualquiera con un toquen valido
router.post('/', (req, res) => {
    res.json('post')
})

// Actializar - Privado - Cualquiera con toquen valido
router.put('/:id', (req, res) => {
    res.json('actualizar')
})

// Borrar una categoria - Administrador
router.delete('/:id', (req, res) => {
    res.json('estado = false')
})

module.exports = router