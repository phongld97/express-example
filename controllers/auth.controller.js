const md5 = require('md5');
const User = require('../models/user.model');

module.exports.authPost = async (req, res) => {
    var email = req.body.email; 
    var user =  await User.findOne({ email: email });

    if (!user) {
        res.render('auth/login', {
            errors: [
                "Email not exist."
            ],
            values: req.body
        });
        return;
    }

    var password = req.body.password;
    var hashPassword = md5(password);
    var userPassword = user.password;
    
    if (hashPassword !== userPassword) {
        res.render('auth/login', {
            errors: [
                "Password invalid"
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userID', user._id, { signed: true });
    res.redirect('/users');
};

module.exports.login = (req, res) => {
    res.redirect('/');
}