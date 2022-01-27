const Product = require("../models/product.model")

// Validation of Product
const verifyIdProduct = async(id = '') => {
    const thereProduct = await Product.findById(id)

    if ( !thereProduct || thereProduct.state === false) {
        throw new Error(`This product id isn't exists`)
    }
}

module.exports = {
    verifyIdProduct
}