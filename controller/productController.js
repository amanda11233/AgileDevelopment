const product = require("../model/Product");
const fs = require('fs');


var checkIfDirectoryExists = (dirname, successcallback, errorcallback) => {
    try{
        var stats = fs.lstatSync(dirPath);
       
        if (stats.isDirectory()) {
            successCallback();
        }
    }catch(e){
        errorcallback();
    }
}

 var mkdirectory = (dirPath) => {

    return new Promise(function(resolve, reject) {
        checkIfDirectoryExists(dirPath, function() {
            resolve();
        }, function() {
            fs.mkdirSync(dirPath);
            resolve();
        });
    });

}

class ProductController{


    addProducts(req, res){

            product.create({
                product_name : req.body.name,
                category_id : req.body.category,
                price : req.body.price,
                detail: req.body.detail,
                image : [],
                brand : req.body.brand
            }, function(err, response){
                if(err) return res.status(500).send(err);
                req.files.map(function(item, index){    
                    var imagename = item.filename;
                    var imagearray = [];
        
                    imagearray.push(imagename)
                product.findByIdAndUpdate(response._id, { $push : { image : { "$each" : imagearray}}}, function(err, productRes){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })

                    var path = "public/images/products/";
                    var dirname = path + "/" + response._id;
                    var tmpfilename = "tmp" + imagename;
                    var fileExists = fs.existsSync(dirname);

                    if(fileExists){
                            fs.rename('public/images/tmp/' + imagename, dirname + '/' + imagename, function(err){
                                if(err) return res.status(400).send(err.message)
                                if(index == (imagearray.length - 1)){
                                    return res.status(200).send({
                                        success: true,
                                        message: "Product Added",
                                    });
                                }
                            })
                    } else {
                        mkdirectory(dirname).then(function(){
                            fs.rename('public/images/tmp/' + imagename, dirname + '/' + imagename, function(err){
                                if(err) return res.status(400).send(err.message)
                                if(index == (imagearray.length - 1)){
                                    return res.status(200).send({
                                        success: true,
                                        message: "Product Added",
                                    });
                                }
                            })
                        })
                    }

                })
                
               
            })
        })
        
        
    } 

    getProducts(req, res){
            product.find().populate("category_id").exec(function(err, products){
                if(err) return res.status(500).send(err);
            
                return res.json({
                    success : true,
                    message: "Product Added",
                    products : products
                });
            })
    }

    getLatestProducts(req, res){
  
            product.find().sort('-createdAt').populate("category_id").exec(function(err, products){
                if(err) return res.status(500).send(err);
            
                return res.json({
                    success : true,
                    message: "Product Added",
                    products : products
                });
            })
        
        
      
    }

    getProductById(req, res){

    }

    updateProducts(req, res){

    }

    deleteProducts(req, res){

    }

}


module.exports = ProductController;