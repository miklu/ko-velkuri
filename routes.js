var express = require('express');
var router = express.Router();
var Velka = require('./models');

var a = [];

// Velkojen summat lanaajan mukaan
router.get('/velat', function(req, res) {
  Velka.haeVelat(function(err, velat) {

    if (err) {
      console.log(err);
    } else {
      res.json(velat);
    }

  });
});

// Kaikki velat tietoineen lainaajan mukaan
router.get('/velat/:nimi', function(req, res) {
  Velka.haeVelanTiedot(req.params.nimi, function(err, velat) {

    if (err) {
      console.log(err);
    } else {
      res.json(docs);
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
  Velka.haeKaikki(function(err, velat) {
    if (err) {
      res.send('Kaikkien velkojen haussa tapahtui virhe.');
    } else {
      res.render('index', {
        velat: velat
      });
    }
  });
});

module.exports = router;