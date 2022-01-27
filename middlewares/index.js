const jwtValidate = require('./validate-jwt.middle')
const validateFields = require('./validate-fields.middle')
const isAdminRole = require('./validate-role.middle')

module.exports = {
    ...validateFields,
    ...jwtValidate,
    ...isAdminRole
}