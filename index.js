const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db  = low(adapter);

db.defaults({users: []}).write();


app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.render('index'));

app.get('/users', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers,
        query: q
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));