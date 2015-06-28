'use strict';

var _ = require('lodash'),
  moment = require("moment");

module.exports = function(values, CURRENT_TEMPERATURE, HEATER_RATE) {
  var CURRENT_TIME = moment();
  var timeTakenToHeat = _.map(_.values(values), function(value, index) {
    var userTime = moment().set('hour', parseInt(value.hour)).set('minute', parseInt(value.minute));
    var userTemperature = parseInt(value.temperature);

    var minutesRemaining = Math.ceil((userTime - CURRENT_TIME) / 60000);
    var minutesTakenToHeat = Math.ceil(HEATER_RATE * (userTemperature - CURRENT_TEMPERATURE));

    var dataToCompute = {
      minutesRemaining: minutesRemaining,
      minutesTakenToHeat: minutesTakenToHeat
    };

    console.log('dataToCompute : ' + JSON.stringify(dataToCompute));

    if (minutesRemaining < 0) {
      return Math.floor(Math.random() * (1000 - 20)) + 20;
    }

    return minutesTakenToHeat - minutesRemaining;
  });

  var shouldTurnOn = _.filter(timeTakenToHeat, function(n) {
    return n >= -1 && n <= 1;
  }).length !== 0;

  return shouldTurnOn;
};
