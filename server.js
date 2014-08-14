var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');
var path = require('path');
var hbs = require('hbs');

var app = express();

// Ainoastaan etusivu, sillä SPA
app.set('views', path.join(__dirname, 'views'));
// JOS html
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');
app.set('view engine', 'hbs');


// Muista muuttaa /dist
app.use(express.static(__dirname + '/public'));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

var mongoUrl = 'mongodb://localhost/velkuri';

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Virhe yhdistäessä tietokantaan'));
db.once('open', function() {
  console.log('Yhdistetty tietokantaan');
});

app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Palvelin käynnistetty');
});

module.exports = app;