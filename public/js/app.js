
var ViewModel = function() {
  var self = this;
  self.velat = ko.observableArray();
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
    });
  };

  self.haeVelat();

};

ko.applyBindings(new ViewModel());