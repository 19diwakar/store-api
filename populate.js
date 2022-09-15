require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/products')
const jsonProuducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProuducts)
        console.log('Success!!!')
    } catch (err) {
        console.log(err)
    }
}

start()