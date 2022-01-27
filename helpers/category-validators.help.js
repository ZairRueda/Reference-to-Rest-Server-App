const Category = require("../models/category.model")

// Validation of Categories

const verifyIdCategory = async(id = '') => {
    const thereCategory = await Category.findById(id)

    if ( !thereCategory || thereCategory.state === false) {
        throw new Error(`This category id isn't exists`)
    }
}

module.exports = {
    verifyIdCategory
}