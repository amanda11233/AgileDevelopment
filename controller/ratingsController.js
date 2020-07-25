const rating = require('../model/Rating');


class RatingsController {


    addRatings(req, res){
        rating.create({
            user : req.userdata._id,
            product : req.body.product,
            ratings: req.body.ratings
        }, function(err, ratings){
            if(err) return res.status(500).send(err);

            return res.json({
                success: true,
                message:  "Ratings Successfully Added",
                ratings : ratings
            });
        });
    }


  

}


module.exports = RatingsController;