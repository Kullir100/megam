'use strict';

var _ = require('lodash'),
  moment = require("moment");

module.exports = function(values, CURRENT_TEMPERATURE, HEATER_RATE) {
  var CURRENT_TIME = moment();
  var time_taken_to_heat = _.map(_.values(values), function(value, index) {
    var user_time = moment().set('hour', parseInt(value.hour)).set('minute', parseInt(value.minute));
    var user_temperature = parseInt(value.temperature);

    var minutes_remaining = Math.ceil((user_time - CURRENT_TIME) / 60000);
    var minutes_taken_to_heat = HEATER_RATE * (user_temperature - CURRENT_TEMPERATURE);

    return minutes_taken_to_heat - minutes_remaining;
  });

  var should_turn_on = _.filter(time_taken_to_heat, function(n) {
    return n >= -6 && n <= 8;
  }).length === 0;

  return should_turn_on;
};
