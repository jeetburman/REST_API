const express = require('express');
const categoryRouter = require('./routes/category.route');
const productRouter = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/categories',categoryRouter)
app.use('/product',productRouter)

const PORT = 7000;
app.listen(PORT,()=>{console.log(`Server running on PORT : http://localhost:7000`)});