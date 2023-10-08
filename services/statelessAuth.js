// Stateless Authentication
const jwt = require('jsonwebtoken');
const secretKey = "animewillsavethisuniverse"

function setUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        fullName:user.fullName,
        roles:user.roles
    }

    return jwt.sign(payload,secretKey)
}

function getUser(token){
    try{
        if(!token) return null;
        return jwt.verify(token,secretKey)
    }
    catch(error){
        return null;
    }
    
}

module.exports = {setUser,getUser}
