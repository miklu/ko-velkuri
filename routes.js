var express = require('express');
var router = express.Router();
var Velka = require('./models');

// Velkojen summat lainaajan mukaan
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

// Tallennus
router.post('/tallenna', function(req, res) {
  var velka = new Velka({
    lainaaja: req.body.lainaaja,
    velallinen: req.body.velallinen,
    kuvaus: req.body.kuvaus,
    summa: req.body.summa,
  });

  velka.save(function(err, doc) {
    if(err) {
      throw err;
    }
    else {
      res.json(doc);
    }
  });
});

// Muokkaus
router.put('/muokkaa/:id', function(req, res) {
  Velka.findById(req.params.id, function(err, result) {
    if(err) {
      throw err;
    }
    else {
      result.lainaaja = req.body.lainaaja;
      result.velallinen = req.body.velallinen;
      result.summa = req.body.summa;
      result.kuvaus = req.body.kuvaus;
      result.save(function(err, saved) {
        if(err) {
          throw err;
        }
        else {
          res.json(saved);
        }
      });
    }
  });
});

// Poistaminen
router.delete('/poista/:id', function(req, res) {
  Velka.findByIdAndRemove(req.params.id, function(err, removed) {
    if(err) {
      throw err;
    }
    else {
      res.json(removed);
    }
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
    console.log(docs);
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