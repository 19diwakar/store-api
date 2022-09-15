const Product = require('../models/products')

const getAllProducts = async (req, res) => {
    const { featured, company, search } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (search) {
        queryObject.name =  { $regex: search, $options: 'i'}
    }

    const products = await Product.find(queryObject);
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const object = { $regex: search, $options: 'i' }
    const products = await Product.find({
        name: object,
        company: object,
    })
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}