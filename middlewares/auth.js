const jwt = require('jsonwebtoken');
const { SECRET, COOKIE_NAME } = require('../config/config');
const isAuthenticated = require('../middlewares/isAuthenticated')
const isGuest = require('../middlewares/isGuest')

module.exports = function () {
    return function (req, res, next) {
        let token = req.cookies[COOKIE_NAME]
        if (token) {
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                    res.locals.user = {};
                    res.locals.isAuthenticated = false;
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            })
        }
        next()
    }
}