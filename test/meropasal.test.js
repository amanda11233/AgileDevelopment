const ModelUser = require('../model/User');
const mongoose = require('mongoose');
const ModelProduct = require('../model/Product');
const ModelDiscount = require('../model/Discount');
const ModelCategory = require('../model/Category');
const ModelWishlist = require('../model/Wishlist');
const ModelRating = require('../model/Rating');


const url = 'mongodb://localhost:27017/MeroPasal'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});



describe('ModelUser  Schema test anything', () => {

    it('Add user testing anything', () => {
        const user = {
            'firstname': 'ram',
            'lastname': 'shah',
            'location': 'Sarlahi',
            'phone': '988615055',  
            'type': 'user',
            'email': 'iamdkshah00@gmail.com',
            'password': 'testing000'
        };
        
        return ModelUser.create(user)
            .then((pro_ret) => {
                expect(pro_ret.firstname).toEqual('ram');
            });
    });
    
});


//user deletion
it('Testing of User Deletion', async() => {
    const status = await ModelUser.deleteOne({ "_id": "5f1fe6c442ca833fc07d5fae" });
    expect(status.ok).toBe(1);
    
});

//adding category

//adding category
describe(' Testing of Category Schema', () => {
    it(' Testing of Adding category', () => {
        const category = {
            'category_name': 'Utensil',
            'image': 'logo.pnng',
         
        };

        return ModelCategory.create(category)
            .then((category) => {
                expect(category.category_name).toEqual('Utensil');
            });
    });
});


// category deletion
it('Testing of Category Deletion', async() => {
    const status = await ModelCategory.deleteOne({ "_id": "5f339054b62c465cf8d13b3b" });
    expect(status.ok).toBe(1);
});


//adding product
describe(' Testing of Product Schema', () => {
    it(' Testing of Adding produvt', () => {
        const product = {
            'product_name': 'ADSshoe',
            'category_id': '5f33a3a91ba1e308c865f138',
            'price': '48845',
            'detail': 'Comfortable and durable',
            'image': 'logo.png',
            'brand': 'Adiabbas',
            'discount': '5f33a311fe80bc44d4c06c86',
        };

        return ModelProduct.create(product)
            .then((product) => {
                expect(product.product_name).toEqual('ADSshoe');
            });
    });
});


//discount
describe(' Testing of Discount Schema', () => {
    it(' Testing of  product discount', () => {
        const discount = {
            'discount_name': 'DashainOffer',
            'discount_value': '10',
         
        };

        return ModelDiscount.create(discount)
            .then((discount) => {
                expect(discount.discount_name).toEqual('DashainOffer');
            });
    });
});

// wishlist
describe(' Testing of Rating Schema', () => {
    it(' Testing of Adding rating', () => {
        const wishlist = {
            'user': '5f33a7823195403d003f8877',
            'product': '5f33a4ee7894a738202ca1cc',
            'ratings': '4',
        };

        return ModelRating.create(rating)
            .then((rating) => {
                expect(rating.ratings).toEqual('4');
            });
    });
});

// wishlist deletion
it('Testing of wish Deletion', async() => {
    const status = await ModelCategory.deleteOne({ "_id": "5f33a4ee7894a738202ca1cc" });
    expect(status.ok).toBe(1);
});