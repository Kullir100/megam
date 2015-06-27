'use strict';

var Store = require("jfs");
var db = new Store("./user_data_store", {
  pretty: true
});
var moment = require("moment");
var _ = require('lodash');

var CURRENT_TEMPERATURE = 30;
var HEATER_RATE = 1; // 1 degree/min
var CURRENT_TIME = moment();

db.all(function(err, objs) {
  var time_taken_to_heat = _.map(_.values(objs), function(value, index) {
    var user_time = moment().set('hour', parseInt(value.hour)).set('minute', parseInt(value.minute));
    var user_temperature = parseInt(value.temperature);

    var minutes_remaining = Math.ceil((user_time - CURRENT_TIME) / 60000);
    var minutes_taken_to_heat = HEATER_RATE * (user_temperature - CURRENT_TEMPERATURE);

    return minutes_taken_to_heat - minutes_remaining;
  });


  if (_.filter(time_taken_to_heat, function(n) {
      return n >= -1 && n <= 1;
    }).length === 0) {
    console.log('off');
  } else {
    console.log('on');
  }
});
