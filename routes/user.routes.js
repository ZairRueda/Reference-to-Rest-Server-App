const { Router } = require('express')
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/user.controller')

const router = Router()

// Este codigo no es escalable, esta todo junto
router.get('/', usuariosGet)

// Si queremos pasarle un argumento al path se agrega despues de :
router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router