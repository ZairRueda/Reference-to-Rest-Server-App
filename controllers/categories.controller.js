const { response, request } = require('express');
const Category = require('../models/category.model');

// Route GET
const categoriesGet = async(req = request, res = response) => {

    const { from = 0, limit = 4} = req.query
    const query = {state: true}

    const [total, categories, populate] = await Promise.all([
        Category.countDocuments(query),

        Category.find(query)

        .skip(parseInt(from))

        .limit(parseInt(limit)),

        Category.find(query).populate('user', 'name')
    ])

    const {state, __v, ...rem} = categories

    res.json({
        total,
        categories,
        populate
    })
}

// Route GET by ID
const categoriesGetById = async(req = request, res = response) => {

    const { id } = req.params

    const [category, populate] = await Promise.all([
        Category.findById(id),
        Category.findById(id).populate('user', 'name')
    ])

    const {user} = populate

    res.status(200).json({
        category,
        user
    })
}

// Route POST
const categoriesPost = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {

        if (categoryDB.state === false) {

            const id = categoryDB._id

            const user = req.user._id
            
            const rem = {
                name,
                state: true,
                user
            }

            const category = await Category.findByIdAndUpdate( id, rem )

            return res.status(201).json({
                msj: 'Successful!!!',
                category
            })
        }

        return res.status(400).json({
            msj: `this category ${categoryDB.name} exists`
        })
    }

    

    // Make data to saved 

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)

    // Save in DB
    await category.save()

    return res.status(201).json({
        msj: 'Successful!!!',
        category
    })

}

// Route PUT
const categoriesPut = async(req, res = response) => {

    const { id } = req.params

    let { state, user, name,...rem } = req.body

    name = name.toUpperCase()

    const [categoryDB, catActual] = await Promise.all([
        Category.findOne({ name }),
        Category.findById(id)
    ])

    if (catActual.state === false) {

        return res.status(400).json({
            msj: `this category isn't exists`
        })

    }

    if (categoryDB) {
        return res.status(400).json({
            msj: `this category ${categoryDB.name} exists`
        })
    }

    rem.name = name

    const category = await Category.findByIdAndUpdate( id, rem )

    return res.status(200).json({
        msj: 'Updated',
        category
    })

}

// Route DELETE
const categoriesDelete = async(req, res = response) => {
    const { id } = req.params
    
    const category = await Category.findByIdAndUpdate(id, {state: false})

    // and print userAuth 
    res.status(201).json({
        msj: 'Deleted',
        category
    })
}

module.exports = {
    categoriesGet,
    categoriesGetById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}