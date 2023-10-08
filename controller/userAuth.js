const userAuth = require('../models/userAuth');
const { setUser } = require('../services/statelessAuth');

async function handlerSignupUser(req,res){
    const{fullName,email,password} = req.body;

    const user = await userAuth.create({
        fullName,
        email,
        password
    });

    const authToken = setUser(user);
    res.cookie('uid',authToken);
    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const{email,password} = req.body;

    const user = await userAuth.findOne({email,password});
    if(!user) return res.render("login",{
        error:'Invalid Username or Password'
    });
    
    const authToken = setUser(user);
    res.cookie('uid',authToken);
    return res.redirect("/")
}

module.exports = ({handlerSignupUser,handleUserLogin});