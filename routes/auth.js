const mongoose = require('mongoose');
const router = mongoose.Router();
const auth = require('../controller/authcontroller');


const userAuthHandler = new auth();

module.exports = router;
