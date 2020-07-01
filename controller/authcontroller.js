
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

    checkEmailAvailability(req, res){
           
            
        user.findOne({email : req.body.email}, function(err, user){
            if(err){
                return res.status(500).send('Error on the server');
                
            }
    
            if(user){
               
                return res.send({
                    success : false,
                    message: 'Email Already Exists',
                    
                });
            }else{
                return res.send({
                    success : true,
                    message: 'Email Available',
                    
                });
            }
            
        })
    }

    register(req, res){
            var hashedPasword = bcrypt.hashSync(req.body.password, 8);
            user.create({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                location : req.body.location,
                phone : req.body.phone,
                email : req.body.location,
                email : req.body.email,
                password : hashedPasword
            }, 
            function(err, user){
                if(err) return res.status(500).send(err);

                let token = jwt.sign({id : user._id}, config.secret,
                   {
                       expiresIn : '24h'
                   });
                   user.tokens = user.tokens.concat({token : token});
                   user.save();

                   return res.status(200).json({
                       success : true,
                       message : 'Authentication successful',
                       token : token
                   })
                })

    }

}

module.exports = AuthController;