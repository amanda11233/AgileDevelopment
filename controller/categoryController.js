const category = require("../model/Category");



class CategoryController{


    addCategory(req, res){
        category.create({
            category_name : req.body.category
        }, function(err, response){
            if(err) return res.status(500).send(err);

            return res.json({
                success : true,
                message : "Category Added",
                category : response
            });
        })
    }

    getCategory(req, res){

    }

    updateCategory(req, res){

    }

    deleteCategory(req, res){
        
    }


}


module.exports  = CategoryController;