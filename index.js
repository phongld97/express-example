require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');

const middlewareAuth = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET_SESSION));
app.use(sessionMiddleware);

app.get('/', (req, res) => res.render('index'));

app.use('/users', middlewareAuth.authLogin, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));