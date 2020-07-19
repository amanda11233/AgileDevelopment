const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

const category= new categoryController();

const tokenHandler = require("../middleware/tokenHandler");
 
router.post('/category', category.addCategory);
router.get('/category', category.getCategory);
router.patch('/category/:id', category.updateCategory);
router.delete('/category/:id',category.deleteCategory);

module.exports = router;