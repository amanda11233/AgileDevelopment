const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const uploadMultiple = require("../middleware/multipleImagesHandler");

const product= new productController();

const tokenHandler = require("../middleware/tokenHandler");


router.get('/product/:id', product.getProductById);
router.get('/product', product.getProducts);
router.get('/product/order/desc', product.getLatestProducts);

router.post('/product', [uploadMultiple] ,product.addProducts);
router.patch('/product/:id', product.updateProducts);
router.delete('/product/:id',product.deleteProducts);

module.exports = router;