const express = require("express");

const categoryRouter = express.Router();

const categoryController = require('../controllers/category.controller')

categoryRouter.post('/',categoryController.createCategory)
categoryRouter.get('/',categoryController.getCategories)
categoryRouter.put('/:id',categoryController.updateCategory)
categoryRouter.delete('/:id',categoryController.deleteCategory)

module.exports = categoryRouter;