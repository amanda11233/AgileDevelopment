
const user = require('../model/User');

class UserController{

    getUser(req, res){
  
        return res.json({
            success : true,
            message : "User is Logged in",
            firstname : req.userdata.firstname,
            lastname : req.userdata.lastname,
            phone : req.userdata.phone,
            location : req.userdata.location,
            email : req.userdata.email,
        })
    }

   
}

module.exports = UserController;