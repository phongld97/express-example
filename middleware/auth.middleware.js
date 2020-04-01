const db = require('../db');

module.exports.authLogin = (req, res, next) => {
    var id = req.signedCookies.userID;

    var user = db.get('users').find({id: id}).value();
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user; 
    next();
}

module.exports.authAfterLogin = (req, res, next) => {
    var id = req.signedCookies.userID;
    var user = db.get('users').find({id: id}).value();
    if (!user) {
        res.render('auth/login');
        return;
    }
    next();
}