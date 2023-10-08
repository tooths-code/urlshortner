const URL = require("../models/url");

async function handleAllUrls(req,res){
    const urls = await URL.find({}) 
    return res.render('home',{
        data:urls,
        userName:req.user.fullName
    })
}

module.exports = {handleAllUrls}