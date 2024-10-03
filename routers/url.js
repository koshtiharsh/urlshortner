const express = require('express');
const { generateNewShortUrl } = require('../controllers/url');
const { check } = require('../controllers/middlewares/auth');

const router = express.Router();


router.post('/',check,generateNewShortUrl);



module.exports = router;