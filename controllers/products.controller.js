const { response, request } = require('express');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

// Route GET
const productsGet = async(req = request, res = response) => {

    const { from = 0, limit = 4} = req.query
    const query = {state: true}

    const [total, products, populate, category] = await Promise.all([
        Product.countDocuments(query),

        Product.find(query)

        .skip(parseInt(from))

        .limit(parseInt(limit)),

        Product.find(query).populate('user', 'name'),

        Product.find(query).populate('category', 'name')

    ])

    const {state, __v, ...rem} = products

    res.json({
        total,
        products,
        populate,
        category
    })

}

// Route GET by ID
const productsGetById = async(req = request, res = response) => {

    const { id } = req.params

    const [product, populate, categoryDB] = await Promise.all([
        Product.findById(id),
        Product.findById(id).populate('user', 'name'),
        Product.findById(id).populate('category', 'name')
    ])

    const {user} = populate
    const {category} = categoryDB

    res.status(200).json({
        product,
        user,
        category
    })

}

// Route POST
const productsPost = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase()
    const price = req.body.price
    const categoryName = req.body.category.toUpperCase()
    const description = req.body.description.toUpperCase()

    const [categoryDB, productDB] = await Promise.all([
        Category.findOne({ name: categoryName, state: true }),
        Product.findOne({ name })
    ])

    if (productDB) {

        if (productDB.state === false) {

            const updateCas = {
                name,
                price,
                category: categoryDB._id,
                description,
                state: true
            }

            const product = await Product.findByIdAndUpdate(productDB._id, updateCas)
    
            // and print userAuth 
            return res.status(201).json({
                msj: 'Successful!!',
                product
            })
    
        }

        return res.status(400).json({
            msj: `This product ${name} is exist`
        })

    }

    if (!categoryDB) {
        
        return res.status(400).json({
            msj: `This category ${categoryName} isn't exist`
        })

    }

    const category = categoryDB._id

    const data = {
        name,
        price,
        category,
        description,
        user: req.user._id
    }

    const product = new Product(data)

    await product.save()

    return res.status(201).json({
        msj: 'Successful!!!',
        product
    })

}

// Route PUT
const productsPut = async(req, res = response) => {

    const { id } = req.params

    let { name, price, category, description, state, user, ...rem } = req.body

    name = name.toUpperCase()
    category = category.toUpperCase()
    description = description.toUpperCase()

    const [productAct , categoryDB, productDB] = await Promise.all([

        Product.findById(id),

        Category.findOne({ name: category, state: true }),

        Product.findOne({ name })

    ])

    if (productAct.state === false) {

        return res.status(400).json({
            msj: `This product isn't exist`
        })

    }

    if (productDB) {

        return res.status(400).json({
            msj: `This product ${name} is exist`
        })

    }

    if (!categoryDB) {
        
        return res.status(400).json({
            msj: `This category ${category} isn't exist`
        })

    }

    rem.name = name
    rem.price = price
    rem.category = categoryDB._id
    rem.description = description

    const product = await Product.findByIdAndUpdate( id, rem )

    return res.status(201).json({
        msj: 'Updated',
        product
    })

}

// Route DELETE
const productsDelete = async(req, res = response) => {

    const { id } = req.params
    
    const product = await Product.findByIdAndUpdate(id, {state: false})

    // and print userAuth 
    res.status(201).json({
        msj: 'Deleted',
        product
    })

}

module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
}