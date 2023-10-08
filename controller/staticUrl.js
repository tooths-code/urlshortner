const URL = require("../models/url");
const shortid = require('shortid')

async function handleStaticRender (req,res){
    // if(!req.user) return res.redirect("/static/auth/login");
    const urls = await URL.find({createdBy:req.user._id}) 
    return res.render('home',{
        data:urls,
        userName:req.user.fullName
    })
}

async function handleRedirection(req,res){
    const urlId = req.params.shortId;

    const entryPoint = await URL.findOneAndUpdate({
        shortId:urlId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    }) 
    
    return res.redirect(entryPoint.redirectUrl);
}

async function handleAnalytics(req,res){
    const urlId = req.params.shortId;

    const entryPoint = await URL.findOne({shortId:urlId})
    
    return res.json({
        clickCount: entryPoint.visitHistory.length,
        clickHistory: entryPoint.visitHistory
    });
}


module.exports = {
    handleStaticRender,
    handleRedirection,
    handleAnalytics
}