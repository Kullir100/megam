'use strict';

var _ = require('lodash')
  , events = require('events')
  , util = require('util')
  , deviceEvents = new events.EventEmitter()
  , devices = {'device': 0};

var OFFSET = 25;

var parseSensorData = function(sensorData) {
  var index = 1;
  return _.reduce(sensorData, function(result, data) {
    result[util.format('device%s', index++)] = parseInt(data);
    return result;
  }, {});
};

var isWithinRange = function(known, actual) {
  return (actual >= (known - OFFSET) && actual <= (known + OFFSET));
};

exports.store = function(value) {
  var sensorData = value.split(':');
  var known = _.clone(devices);
  _.merge(devices, parseSensorData(sensorData));

  if (!isWithinRange(known.device1, devices.device1)) {
    deviceEvents.emit('changed', {name: 'heater', temperature: devices.device1});
  }
};

exports.on = function(evtName, callback) {
  deviceEvents.on(evtName, callback);
};
