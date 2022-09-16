const Product = require('../models/products')

const getAllProducts = async (req, res) => {
    const { featured, company, search, sort, field, numericFilters } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' }
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const regex = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(
            regex,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });
    }

    console.log(queryObject)
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    } else {
        result.sort('createdAt')
    }

    if (field) {
        const fieldList = field.split(",").join(" ")
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({ products, nbHits: products.length })
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product
        .find({ price: { $gt: 100 } })
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}