var express = require('express')
  , config = require('./config/config')
  , kulir = require('./lib/kulir');

var app = express();

require('./config/express')(app, config);

app.listen(config.port);
