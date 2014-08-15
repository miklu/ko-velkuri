
var ViewModel = function() {
  var self = this;
  self.velat = ko.observableArray();
  self.velanTiedot = ko.observableArray();
  self.lomake = {lainaaja: ko.observable(), velallinen: ko.observable(), summa: ko.observable(), kuvaus: ko.observable()};

  self.haeVelat = function() {
    $.get('/velat', function(data) {
      self.velat(data);
    });
  };

  self.tallenna = function() {
    var velka = {
      lainaaja: self.lomake.lainaaja(),
      velallinen: self.lomake.velallinen(),
      summa: self.lomake.summa(),
      kuvaus: self.lomake.kuvaus(),
    };

    $.post('/tallenna', velka)
      .done(function() {
        self.haeVelat();
        self.velanTiedot(null);
        self.lomake.lainaaja(null);
        self.lomake.velallinen(null);
        self.lomake.summa(null);
        self.lomake.kuvaus(null);
    });
  };

  self.naytaVelanTiedot = function(clicked, elem) {
    console.log(clicked, elem);
    $.get('/velat/' + clicked._id, function(data) {
      self.velanTiedot(data);
    });
  };

  self.poista = function(clicked, elem) {
    $.ajax({
        type: 'DELETE',
        url: '/poista/' + clicked._id,
        success: function(data) {
          console.log(data);
        }
      });
      self.velanTiedot(null);
      self.haeVelat();
  };

  self.haeVelat();

};

ko.applyBindings(new ViewModel());