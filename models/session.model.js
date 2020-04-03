var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart: [
        {
            id: String,
            amount: Number
        }
    ]
});

var Session =  mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;