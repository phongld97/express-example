const db = require('../db');

module.exports.getProduct = (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var nextPage = page + 1;

    var prePage = page - 1 || 1; 

    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    
    var products = db.get('products').value().slice(start, end);
    res.render('products/index', {
        products: products,
        currentPage: page,
        nextPage: nextPage,
        prePage: prePage
    });
};