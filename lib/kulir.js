'use strict';

var path = require('path')
  , spark = require('./spark')
  , sensor = require('./sensor')
  , logger = require('./logger');

spark.on('update', function(data) {
  sensor.store(data);
});

sensor.on('changed', function(data) {
  logger.info(JSON.stringify(data));
});
