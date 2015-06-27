'use strict';

var path = require('path'),
  spark = require('./spark'),
  sensor = require('./sensor'),
  logger = require('./logger');

module.exports = function(db) {
  var CURRENT_TEMPERATURE, TIMER, STATUS = 'off';

  var toggleHeater = function() {
    var command = CURRENT_TEMPERATURE < 1000 ? 'on' : 'off';
    if (STATUS !== command) {
      spark.emit('toggleHeater', command);
      STATUS = command;
    }
  };

  var computeTurnOnTime = function() {
    //commputation time logic goes here;
    db.all(function(err, objs) {
      logger.info(JSON.stringify(objs));
    });
  };

  spark.on('update', function(data) {
    sensor.store(data);
  });

  spark.on('toggled', function(status) {
    logger.info(JSON.stringify(status));
  });

  sensor.on('changed', function(data) {
    logger.info(JSON.stringify(data));
    CURRENT_TEMPERATURE = data.temperature;
    toggleHeater();
  });

  TIMER = setInterval(computeTurnOnTime, 60000);
}
