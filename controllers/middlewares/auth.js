const { getUser } = require("../../service/auth");

async function check(req, res, next) {

    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect('/user/login')
    }

    const user = getUser(userUid);



    if (!user) {
        return res.redirect('/user/login')
    }

    next();
}


module.exports = { check }