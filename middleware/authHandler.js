const jwt = require('jsonwebtoken');
const config = require('../config');

let checkUserToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

}