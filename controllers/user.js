const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const {getUser,setUser}= require('../service/auth')


async function userSignUp(req, res) {

    const { name, email, password } = req.body;

    const userData = await User.create({ name, email, password })


    return res.redirect('/')


}

async function userLogin(req, res) {
    const { email, password } = req.body;
    const data = await User.findOne({ email, password })

    if (data) {
        const sessionId = uuidv4();
        const token  = setUser(data)
        res.cookie('uid',token)
        return res.redirect('/')


    } else {
        return res.render('login', {
            error: "Invalid email or password"
        })

    }
}

module.exports = { userSignUp, userLogin }