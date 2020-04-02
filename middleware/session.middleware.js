const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        db.get('sessions').push({ id: sessionId}).write();        
        res.cookie('sessionId', sessionId, { signed: true });
    }
    var sessionId = req.signedCookies.sessionId;
    var cart = db.get('sessions').find({id: sessionId}).get('cart').value();
    var totalCard = 0;
    for (var item in cart) {
        totalCard += parseInt(cart[item]) 
    }
    res.locals.totalCard = totalCard;
    next();
};