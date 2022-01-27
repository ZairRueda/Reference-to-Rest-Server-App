const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require('../models')

const allowedCollections  = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchAnything = async( colection , param = '', res = response ) => { 
    param = param.toUpperCase()

    // For search sensitivity
    const regex = new RegExp(param, 'i')

    // Querys
    const query = {
        name: regex,
        state: true
    }
    const queryMail = {
        email: regex,
        state: true
    } 

    // == Eny colection but it's id ==
    const isMongoId = ObjectId.isValid(param)
    if (isMongoId) {
        const searchResult = await colection.findById(param)
        return res.json({
            results: (searchResult) ? [searchResult] : []
        })
    }

    // == global search ==
    const searchResult = await colection.findOne(query)

    // == If Is Product ==
    if(colection === Product) {
        const [populateUser, populateCategory] = await Promise.all([
            colection.findOne(query).populate('user', 'name'),
            colection.findOne(query).populate('category', 'name'),
        ])
        return res.json({
            results: (searchResult) ? [
                searchResult,
                {user: populateUser['user']['name']},
                {category: populateCategory['category']['name']}
            ] : []
        })
    }

    // == If is Category
    if(colection === Category) {
        const populateUser = await colection.findOne(query).populate('user', 'name')
        return res.json({
            results: (searchResult) ? [
                searchResult,
                {userName: populateUser['user']['name']}
            ] : []
        })
    }

    // == If is User ==
    if(colection === User){
        const searchResult = await colection.find({
            $or: [query, queryMail]
        })
        return res.json({
            results: (searchResult) ? [searchResult] : []
        })
    }
}

// ===== Controller of Search =====
const search = (req, res = response) => {

    const {colection, param} = req.params

    if( !allowedCollections.includes(colection)) {
        return res.status(400).json({
            msg: `The colection ${colection} which you want it isn't exist`,
            msgTow: `they colection allowed are ${allowedCollections}` 
        })
    }

    switch (colection) {
        case 'users':
            searchAnything(User, param, res)
            break;
        case 'categories':
            searchAnything(Category, param, res)
            break;
        case 'products':
            searchAnything(Product, param, res)
            break
    
        default:
            res.status(500).json({
                msj: 'I forget make it this seach'
            })
            break;
    }

}

module.exports = {
    search
}