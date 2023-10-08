const express = require('express');
const {handleGenerateShortUrl,handleRedirection,handleAnalytics} = require("../controller/url")

const router = express.Router();

router.post('/generate',handleGenerateShortUrl)

router.get('/analytics/:shortId',handleAnalytics)

module.exports = router;