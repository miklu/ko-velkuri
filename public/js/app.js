

function ViewModel() {
  var self = this;
  this.velat = ko.observable();
  this.lainat = ko.observable();

  atomic.get('/velat')
  .success(function(data, xhr) {
    self.velat(data);
  });

  atomic.get('/lainat')
  .success(function(data, xhr) {
    self.lainat(data);
  });
}

ko.applyBindings(new ViewModel());