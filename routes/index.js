var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ramen Brotherhood' });
});


/* GET Userlist page. */
router.get('/products', function(req, res) {
    var db = req.db;
    var collection = db.get('productcollection');
    collection.find({},{},function(e,docs){
        res.render('products', {
            "products" : docs
        });
    });
});

/* POST pour ajouter un produit */
router.post('/space', function(req, res) {    
    var db = req.db;
    var productTitle = req.body.title;
    var produitQuality = req.body.quality;
    var productQuantity = req.body.quantity;
    var productImage = req.body.image
    var collection = db.get('productcollection');

    collection.insert({
        "title" : productTitle,
        "quality" : produitQuality,
        "quantity" : productQuantity,
        "image" : productImage
    }, function (err, doc) {
        if (err) {
            res.send("Il y a un problème pour insérer les données dans la base.");
        }
        else {
            res.location("space");
            res.redirect("space");
        }
    });
    console.log(productImage);
});

/* GET home page. */
router.get('/space', function(req, res, next) {
  res.render('space');
});

module.exports = router;
