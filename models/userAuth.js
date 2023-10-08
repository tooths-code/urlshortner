const mongoose = require('mongoose');

//User Login Credential Schema 
const userAuthSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:String,
        default:"NORMAL",
        required:true,
    }

},{timestamps:true});

const userAuth = mongoose.model('userAuth',userAuthSchema);

module.exports = userAuth;