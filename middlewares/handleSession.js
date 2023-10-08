const { getUser } = require("../services/statelessAuth");

//Authentication Function
function checkforAuthentication(req,res,next){
    const authToken = req.cookies.uid;
    req.user = null;

    if(!authToken) return next();

    const user = getUser(authToken);
    req.user = user;
    return next();
}

//Authorization with Roles assign
function restrictRole(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/auth/login");

        if(!roles.includes(req.user.roles)) return res.end('Sorry but you are not allowed!')

        return next()
    }
    
}


module.exports = {checkforAuthentication, restrictRole};