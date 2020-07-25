const express = require('express');
const router = express.Router();
const ratingsController = require('../controller/ratingsController');


const tokenHandler = require("../middleware/tokenHandler");


const ratings = new ratingsController;



router.post('/ratings', tokenHandler.checkUserToken, ratings.addRatings);


 

module.exports = router;