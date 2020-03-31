const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => res.render('index'));

app.use('/users', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));