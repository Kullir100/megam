'use strict';

var path = require('path'),
  spark = require('./spark'),
  sensor = require('./sensor'),
  logger = require('./logger'),
  heater_logic = require('./heater_logic');


module.exports = function(db) {
  var CURRENT_TEMPERATURE, TIMER, STATUS = 'off';
  var HEATER_RATE = 0.1; // degree/min

  var toggleHeater = function(command) {
    if (STATUS !== command) {
      spark.emit('toggleHeater', command);
      STATUS = command;
    }
  };

  var computeTurnOnTime = function() {
    db.all(function(err, objs) {
      var shouldTurnOn = heater_logic(objs, CURRENT_TEMPERATURE, HEATER_RATE);
      toggleHeater(shouldTurnOn === true ? 'on' : 'off');
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
    CURRENT_TEMPERATURE = data.temperature; //find value by difference
    computeTurnOnTime();
  });

  TIMER = setInterval(computeTurnOnTime, 60000);
};
