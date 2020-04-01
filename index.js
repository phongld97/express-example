require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const middlewareAuth = require('./middleware/auth.middleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET_SESSION));

app.get('/', (req, res) => res.render('index'));

app.use('/users', middlewareAuth.authLogin, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));