var mongoose = require('mongoose');

var VelatSchema = mongoose.Schema({
  lainaaja: String,
  velallinen: String,
  kuvaus: String,
  summa: Number
}, {
  collection: 'velat'
});


VelatSchema.statics.haeKaikki = function(cb) {
  return this.find({}).exec(cb);
};

VelatSchema.statics.haeVelat = function(cb) {
  return this.aggregate({
    $match: {
      velallinen: "Miikka"
    }
  }, {
    $group: {
      _id: "$lainaaja",
      yhteensa: {
        $sum: "$summa"
      }
    }
  }).exec(cb);
};

VelatSchema.statics.haeVelanTiedot = function(nimi, cb) {
  return this.find({
    lainaaja: nimi
  }).exec(cb);
};

VelatSchema.statics.haeLainat = function(cb) {
  return this.aggregate({
    $match: {
      lainaaja: "Miikka"
    }
  }, {
    $group: {
      _id: "$velallinen",
      yhteensa: {
        $sum: "$summa"
      }
    }
  }).exec(cb);
};

VelatSchema.statics.haeLainanTiedot = function(nimi, cb) {
  return this.find({
    velallinen: nimi
  }).exec(cb);
};

var Velka = mongoose.model('Velka', VelatSchema);

module.exports = Velka;