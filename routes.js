var express = require('express');
var router = express.Router();
var Velka = require('./models');

// Velkojen summat lanaajan mukaan
router.get('/velat', function(req, res) {
  Velka.haeVelat(function(err, velat) {

    if (err) {
      console.log(err);
    } else {
      res.json(velat);
      console.log(velat);
    }

  });
});

router.post('/tallenna', function(req, res) {
  var velka = new Velka({
    lainaaja: req.body.lainaaja,
    velallinen: req.body.velallinen,
    kuvaus: req.body.kuvaus,
    summa: req.body.summa,
  });

  velka.save(function(err, doc) {
    res.json(doc);
  });

});

// Kaikki velat tietoineen lainaajan mukaan
router.get('/velat/:nimi', function(req, res) {
  Velka.haeVelanTiedot(req.params.nimi, function(err, velat) {

    if (err) {
      console.log(err);
    } else {
      res.json(velat);
    }

  });
});

// Saatavien summat lainaajan mukaan
router.get('/lainat', function(req, res) {
  Velka.haeLainat(function(err, docs) {
    res.json(docs);
  });
});

// Kaikki saatavat tietoineen lainaajan mukaan
router.get('/lainat/:nimi', function(req, res) {
  Velka.haeLainanTiedot(req.params.nimi, function(err, docs) {
    res.json(docs);
  });
});

// Etusivu
router.get('/', function(req, res) {
      res.render('index');
});

module.exports = router;