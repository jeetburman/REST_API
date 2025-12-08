const express = require('express');
const productController = require('../controllers/product.controller');
const productRouter = express.Router();

productRouter.post('/',productController.createProduct);
productRouter.get('/',productController.getProduct);
productRouter.get('/:id',productController.getProductById);
productRouter.put('/:id',productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);
productRouter.get('/category/categoryId',productController.getProductsByCategoryId)


module.exports = productRouter;