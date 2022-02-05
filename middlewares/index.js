const jwtValidate = require('./validate-jwt.middle')
const validateFields = require('./validate-fields.middle')
const isAdminRole = require('./validate-role.middle')
const verifyIdCategory = require('./validate-category.middle')
const verifyIdProduct = require('./validate-product.middle')

module.exports = {
    ...validateFields,
    ...jwtValidate,
    ...isAdminRole,
    ...verifyIdCategory,
    ...verifyIdProduct 
}