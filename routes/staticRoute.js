const express = require('express');
const {handleStaticRender,handleRedirection} = require("../controller/staticUrl");
const { restrictRole } = require('../middlewares/handleSession');

const router = express.Router();

router.get('/:shortId',handleRedirection)

router.get('/',restrictRole(['NORMAL','ADMIN']),handleStaticRender)

router.get('/auth/signup',(req,res)=>{
    return res.render("signup")
})

router.get('/auth/login',(req,res)=>{
    return res.render("login")
})

module.exports = router