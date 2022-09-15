require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not_found');
const errorHandlerMiddleware = require('./middleware/error_handler');

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')
//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res
        .send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
})

app.use('/api/v1/products', productRouter)

//products route


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening on port http://localhost:${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()