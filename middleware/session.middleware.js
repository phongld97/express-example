const Session = require('../models/session.model');

module.exports = async (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        var session = new Session ();
        session.save();       
        res.cookie('sessionId', session._id, { signed: true });
    }
    var sessionId = req.signedCookies.sessionId;
    var session = await Session.findOne({ _id: sessionId });
    
    var cart = session.cart;
    var totalCard = 0;
    for (var item of cart) {
        totalCard += parseInt(item.amount);
    }
    
    res.locals.totalCard = totalCard;
    next();
};