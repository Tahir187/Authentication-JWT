'use strict';


// create server
const express = require('express'), app = express(), port = process.env.PORT || 8080;

// import file
const User = require('./api/models/userModel');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

// import mongo db as mongoose
const mongoose = require('mongoose');
const option = {
    socketTimeoutMS : 30000,
    keepAlive : true,
    reconnectTries: 30000
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb://127.0.0.1:8080/?compressors=disabled&gssapiServiceName=mongodb', option).then(function(){
    //connected successfully
}, function(err) {
    //err handle
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){

            if(err) req.user =  undefined;
            req.user = decode;
            next();
        });
    }else{
        req.user = undefined;
        next();
    }
});

// route file import 
const routes = require('./api/routes/userRoutes');
routes(app);

app.use(function(req,res){
    res.status(404).send({url: req.originalUrl + 'not found'});
});

app.listen(port, ()=>{
    console.log('RESTful API server started on: ' + port)
});
