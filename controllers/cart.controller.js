const Session = require('../models/session.model');

module.exports.add = async (req, res, next) => {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var session = await Session.findOne({_id: sessionId});
    var arrIdProduct = session.cart;
    
    var count = 0;
    for (var i of arrIdProduct) {
        if (i.id === productId) {
            count = i.amount;
        }
    }
    if (arrIdProduct.length === 0 || count === 0) {
        await Session.update(
            { _id: sessionId },
            {
                $push: {
                    cart: {
                        id: productId,
                        amount: 1
                    }
                }
            },
        );
    }

    if (count) {
        await Session.update(
            { _id: sessionId, "cart.id": productId },
            {
                $set: {
                    "cart.$.amount": count + 1
                }
            },
            { upsert: true }
        );
    }

    res.redirect('/products');
};