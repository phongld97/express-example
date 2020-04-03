const User = require('../models/user.model');

module.exports.authLogin = async (req, res, next) => {
    var id = req.signedCookies.userID;

    var user = await User.findOne({ _id: id });
    
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user; 
    next();
}

module.exports.authAfterLogin = async (req, res, next) => {
    var id = req.signedCookies.userID;

    var user = await User.findOne({ _id: id });
    
    if (!user) {
        res.render('auth/login');
        return;
    }
    next();
}