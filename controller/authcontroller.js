
const user = require('../model/User');
let jwt = require('jsonwebtoken');
let config = require('../config');
const bcrypt = require('bcrypt');


class AuthController{
    login(req, res){
        user.findOne({email : req.body.email}, function(err, user){
            if(err){
                return res.status(500).json({
                    success : false,
                    message : "Server error"
                })
            }

            if(!user){
                return res.status(401).json({
                    success : false,
                    message : "Incorrect username or password",
                    token : null
                })
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid){
                return res.status(401).json({
                    success : false,
                    message : "Incorrect username or password",
                    token : null
                })
            }

            let token = jwt.sign({id : user._id.toString()}, config.secret,
            {
                expiresIn : '24h'
            });
            user.tokens  = user.tokens.concat({token : token});
            user.save();
            return res.status(200).json({
                success : true,
                message : "Authentication successful",
                token : token,
                
            })
        })
    }
}

module.exports = AuthController;