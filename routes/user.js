const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

const user = new userController();

const tokenHandler = require("../middleware/tokenHandler");

router.get('/user', tokenHandler.checkUserToken, user.getUser );

module.exports = router;