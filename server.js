// creating server through express
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

// creating connection to the dataBase
const db = require('./app/models');
const dbConfig = require('./config/db.config');
const Role = db.role;

db.mongoose.connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connect to MongoDb");
    initial();
}).catch(err =>{
    console.error("Connection error", err);
    process.exit();  
});

function initial(){
    Role.estimatedDocumentCount((err, count)=>{
        if(!err && count === 0){
            // user role
            new Role({
                name: "user"
            }).then(err =>{
                if(err){
                    console.log("error", err)
                }
                console.log("added 'user' to roles collection");
            });
            // moderator role
            new Role({
                name : "moderator"
            }).then(err =>{
                if(err){
                    console.log("error", err)
                }
                console.log("added 'moderator' to roles collection");
            });
            // admin role
            new Role({
                name : "admin",
            }).then(err =>{
                if(err){
                    console.log("error", err)
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });

}
// getting request from front end
const corsOptions = {
    origin: "http://localhost:8081"
};

// now use corsOption to get request
app.use(cors(corsOptions));

// parse requst of content-type -application/json
app.use(express.json());

// parse request of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// create session cookies using author name
app.use(
    cookieSession({
        name: "tahir",
        secret: "COOKIE_SECRET",
        httpOnly: true
    })
);

// simple route
app.get('/', (req, res)=>{
    res.json({message: "Welcome to tahir application."});
})

// set port, listen for request
const PORT  = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})

