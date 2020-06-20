const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');

let checkUserToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if(token){
            token = token.slice(7, token.length);
     
        jwt.verify(token, config.secret, async(err, decoded)=>{
            if(err){
                return res.json({
                    success: false,
                    message : "Token is not valid"
                })
            }
            else {
                req.decoded = decoded;
                const user = User.findOne({
                    _id : decoded.id, 
                    'tokens.token' : token
                })
                if(!user){
                    return res.json({
                        success : false,
                        message : "Auth token is not supplied"
                    })
                }
                req.user = user;
                req.token = token;
                next();
            }
        });
    }else{
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
          });
    }
}