const User = require('../models/user.model');

module.exports.index = async (req, res) => {
    var users =  await User.find();
    res.render('users/index', {
        users: users
    });
}

module.exports.search = async (req, res) => {
    var q = req.query.q;
    var users = await User.find();
    var matchedUsers = users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers,
        query: q
    });
};

module.exports.getCreate = (req, res) => res.render('users/create');

module.exports.postCreate = (req, res) => {
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    var user = new User({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        avatar: req.body.avatar,
    });
    user.save();
    res.redirect('/users');
};

module.exports.getId = async (req, res) => {
    var id = req.params.id;
    var user = await User.findOne({ _id: id });
    res.render('users/view', {
        user: user
    });
};