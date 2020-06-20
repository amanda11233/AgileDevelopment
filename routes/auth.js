const express = require('express');
const router = express.Router();
const auth = require('../controller/authcontroller');


const userAuthHandler = new auth();

module.exports = router;
