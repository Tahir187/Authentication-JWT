// const Mongoose = require("mongoose");

// const DATABASE_URL = "mongodb+srv://UserTest:Password@cluster0-k3ekk.mongodb.net/test?retryWrites=true&w=majority";

// Mongoose.connect(DATABASE_URL, {useNewUrlParser: true});

// const UserSchema = new Mongoose.Schema({
//     email:{
//         type: String,
//         unique: true,
//         required: true,
//         lowercase: true,
//         trim: true
//     },
//     password:{
//         type : String,
//         required: true
//     }
// },{collection: "users"});

// module.exports.User = Mongoose.modle("User", UserSchema);