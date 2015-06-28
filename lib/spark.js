'use strict';

var spark = require('spark')
  , Q = require('q')
  , accessToken = process.env.ACCESS_TOKEN
  , deviceId = process.env.DEVICE_ID
  , util = require('util')
  , events = require('events')
  , sparkEvents = new events.EventEmitter()
  , logger = require('./logger');

var DEVICE;

var getCore = function() {
  var deferred = Q.defer();
  if (DEVICE) {
    deferred.resolve(DEVICE);
  } else {
    spark.login({accessToken: accessToken}).then(function() {
      logger.info('Successfully authenticated');
      spark.getDevice(deviceId).then(
        function(device) {
          DEVICE = device;
          logger.info(util.format('Using device: %s', device.name));
          deferred.resolve(DEVICE);
          sparkEvents.emit('init');
        },
        function(error) {
          deferred.reject(new Error(error));
        }
      );
    });
  }
  return deferred.promise;
};

var registerForSparkEvents = function() {
  getCore().then(function(device) {
    logger.info('Subscribing for events from sensor');
    device.subscribe('change', function(evt) {
      sparkEvents.emit('update', evt.data);
    });
  });
};

sparkEvents.on('toggleHeater', function(command) {
  getCore().then(function(device) {
    logger.info('Toggling heater: ' + command);
    device.callFunction('toggleHeater', command, function(err, data) {
      if (!err) {
        sparkEvents.emit('toggled', data);
      } else {
        logger.error(err);
      }
    });
  });
});

module.exports = (function() {
  registerForSparkEvents();
  return sparkEvents;
})();
