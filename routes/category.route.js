const express = require("express");

const categoryRouter = express.Router();

const categoryController = require('../controllers/category.controller')

categoryRouter.post('/',categoryController.createCategory)

module.exports = categoryRouter;