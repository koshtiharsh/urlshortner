const express = require('express');
const { userSignUp, userLogin } = require('../controllers/user');
const User = require('../models/user');
const { check } = require('../controllers/middlewares/auth');

const router = express.Router();


router.post('/signup', userSignUp)

router.get('/signup', (req, res) => {
    res.render('singup')
})
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',userLogin)

module.exports = router;