'use strict';

var _ = require('lodash'),
  events = require('events'),
  util = require('util'),
  deviceEvents = new events.EventEmitter(),
  lastValue = 0;

var knownLowerDeviceValue = 3025;
var knownUpperDeviceValue = 3500;
var knownLowerTemperature = 30;
var knownUpperTemperature = 95;
var temperaturePerValue = (knownUpperTemperature - knownLowerTemperature) / (knownUpperDeviceValue - knownLowerDeviceValue);

var computeTemperature = function(value) {
  return Math.ceil(knownLowerTemperature + (temperaturePerValue * (value - knownLowerDeviceValue)));
};

var OFFSET = 15;

var isWithinRange = function(known, actual) {
  return (actual >= (known - OFFSET) && actual <= (known + OFFSET));
};

exports.store = function(value) {
  if (!isWithinRange(lastValue, value)) {
    lastValue = parseInt(value);
    deviceEvents.emit('changed', {
      name: 'heater',
      temperature: computeTemperature(value),
      value: value
    });
  }
};

exports.on = function(evtName, callback) {
  deviceEvents.on(evtName, callback);
};
