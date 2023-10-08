const express = require('express');
const { handlerSignupUser, handleUserLogin } = require('../controller/userAuth');

const router = express.Router();

router.post('/signup',handlerSignupUser);

router.post('/login',handleUserLogin);

module.exports = router;