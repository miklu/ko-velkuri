function ViewModel() {
  var self = this;
  
  self.velat = ko.observable();
  self.lainat = ko.observable();
  
  self.velatSumma = ko.observable();
  self.lainatSumma = ko.observable();

  self.details = ko.observable(null);

  atomic.get('/velat')
    .success(function(data, xhr) {
      self.velat(data);
      self.velatSumma(laskeSumma(data));
    });

  atomic.get('/lainat')
    .success(function(data, xhr) {
      self.lainat(data);
      self.lainatSumma(laskeSumma(data));
    });

  self.showDetails = function(clicked) {
    atomic.get('/velat/' + clicked._id)
      .success(function(data, xhr) {
        self.details(data);
      });
  };
}

function laskeSumma(array) {
  var summa = 0;
  array.forEach(function(elem) {
    summa += elem.yhteensa;
  });
  return summa;
}

ko.applyBindings(new ViewModel());