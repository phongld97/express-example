var express = require('express');
var db = require('../db')
var router = express.Router();
const shortid = require('shortid');

router.get('/', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers,
        query: q
    });
});

router.get('/create', (req, res) => {
    res.render('users/create');
});

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
});

module.exports = router;