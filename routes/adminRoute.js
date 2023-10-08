const express = require('express');
const { handleAllUrls } = require('../controller/adminUrl');

const router = express.Router();

router.get('/urls',handleAllUrls);

module.exports = router;