require('./database/connection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/public", express.static(__dirname + '/public'));

//Authentication Route
app.use('/api/auth', require('./routes/auth'));

//User Route
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/discount'));
app.use('/api', require('./routes/ratings'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
    });
    
    
    app.listen(process.env.port || 3200, function(){
    
    
    });
    