const express = require("express");
const router = express.Router();
const categoryController = require('../Controller/category');

router.post('/categories', categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
