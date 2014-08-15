(function() {

var ViewModel = function() {
  var self = this;
  self.velat = ko.observableArray();
  self.velanTiedot = ko.observableArray();
  self.lomake = {lainaaja: ko.observable(), velallinen: ko.observable(), summa: ko.observable(), kuvaus: ko.observable(), isNew: ko.observable(true)};
  self.muokattavaID = null;

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
    // Tarkistetaan onko kyseessä uusi velka
    if(self.lomake.isNew()) {
      $.post('/tallenna', velka)
        .done(function() {
          self.haeVelat();
          self.tyhjennaLomake();
      });
    }
    // Muokkaus
    else {
      self.lomake.isNew(true);
      $.ajax({
          type: 'PUT',
          url: '/muokkaa/' + self.muokattavaID,
          data: velka,
          success: function(data) {
            self.haeVelat();
            self.tyhjennaLomake();
          }
        });

    }
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

  self.muokkaa = function(clicked, elem) {
    console.log('TODO');
    self.lomake.isNew(false);
    self.muokattavaID = clicked._id;
    self.lomake.lainaaja(clicked.lainaaja);
    self.lomake.velallinen(clicked.velallinen);
    self.lomake.summa(clicked.summa);
    self.lomake.kuvaus(clicked.kuvaus);
  };

  self.tyhjennaLomake = function() {
    self.velanTiedot(null);
    self.lomake.lainaaja(null);
    self.lomake.velallinen(null);
    self.lomake.summa(null);
    self.lomake.kuvaus(null);
  };

  self.haeVelat();

};

ko.applyBindings(new ViewModel());

})();