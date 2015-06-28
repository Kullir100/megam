'use strict';

var _ = require('lodash'),
  events = require('events'),
  util = require('util'),
  deviceEvents = new events.EventEmitter(),
  lastValue = 0;

var OFFSET = 15;

var isWithinRange = function(known, actual) {
  return (actual >= (known - OFFSET) && actual <= (known + OFFSET));
};

exports.store = function(value) {
  if (!isWithinRange(lastValue, value)) {
    lastValue = parseInt(value);
    deviceEvents.emit('changed', {
      name: 'heater',
      temperature: value
    });
  }
};

exports.on = function(evtName, callback) {
  deviceEvents.on(evtName, callback);
};
