const mongoose = require('mongoose');

//Create a Schema Structure
const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required: true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{
        type:Number
    }}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userauths"
    }
},{timestamps:true})

//Create a Model/Collection
const URL = mongoose.model('shortUrls',urlSchema)

module.exports = URL;