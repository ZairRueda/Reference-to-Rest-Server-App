const jwtValidate = require('../middlewares/validar-jwt.middle')
const validarCampos = require('../middlewares/validar-campos.middle')
const isAdminRole = require('../middlewares/validar-role.middle')

module.exports = {
    ...validarCampos,
    ...jwtValidate,
    ...isAdminRole
}