const md5 = require('md5');

const db = require('../db');

module.exports.authPost = (req, res) => {
    var email = req.body.email; 
    var user = db.get('users').find({email: email}).value();
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
    if (hashPassword !== user.password) {
        res.render('auth/login', {
            errors: [
                "Password invalid"
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id, { signed: true });
    res.redirect('/users');
};

module.exports.login = (req, res) => {
    res.redirect('/');
}