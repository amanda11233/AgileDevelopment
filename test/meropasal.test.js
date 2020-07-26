const ModelUser = require('../model/User');
const mongoose = require('mongoose');

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
            'firstname': 'deepak',
            'lastname': 'shah',
            'location': 'Sarlahi',
            'phone': '988615096',  
            'type': 'user',
            'email': 'iamdkshah27@gmail.com',
            'password': 'testing123'
        };
        
        return ModelUser.create(user)
            .then((pro_ret) => {
                expect(pro_ret.firstname).toEqual('deepak');
            });
    });
    
});
