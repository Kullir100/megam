'use strict';
var heater_logic = require('./lib/heater_logic');

var db_values = {
  '196f13b3-d6a1-474e-8c63-db479c0b7297': {
    hour: 3,
    minute: 24,
    temperature: 70,
    device_id: '196f13b3-d6a1-474e-8c63-db479c0b7297'
  },
  '196f13b3-d6a1-474e-8c63-db479c0b7296': {
    hour: '3',
    minute: '00',
    temperature: 70,
    device_id: '196f13b3-d6a1-474e-8c63-db479c0b7296'
  }
};
var shouldTurnOn = heater_logic(db_values, 30, 1);

if (shouldTurnOn === true) {
  console.log('off');
} else {
  console.log('on');
}
