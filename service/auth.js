const jwt = require('jsonwebtoken')


function setUser(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    return jwt.sign(payload, 'secret')
}




function getUser(token) {
    return jwt.verify(token, 'secret')
}


module.exports = {
    setUser,
    getUser
}