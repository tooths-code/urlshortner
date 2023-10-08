const mongoose = require('mongoose');

async function createConnection(url){
    return mongoose.connect(url)
    .then(()=> console.log("DB Connection Established"))
    .catch(err=>console.log("DB Connection Failed", err))
}

module.exports = {createConnection}