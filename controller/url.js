const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"URL is required"});
    const shortId = shortid();

    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
        //req.user is passed from middleware
        createdBy:req.user._id
    })

    return res.render('home',{
        id:shortId,
        userName:req.user.fullName
    })
}

async function handleRedirection(req,res){
    const urlId = req.params.id;

    const entryPoint = await URL.findOneAndUpdate({
        shortId:urlId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    },{ new: true }) 
    return res.redirect(entryPoint.redirectUrl);
}

async function handleAnalytics(req,res){
    const urlId = req.params.id;

    const entryPoint = await URL.findOne({urlId})
    return res.json({
        clickCount: entryPoint.visitHistory.length,
        clickHistory: entryPoint.visitHistory
    });
}


module.exports = {
    handleGenerateShortUrl,
    handleRedirection,
    handleAnalytics,
}