'use strict';

var bunyan = require('bunyan')
  , chalk = require('chalk')
  , log = bunyan.createLogger({name: 'megam'})
  , error = chalk.bold.red
  , info = chalk.green
  , warn = chalk.yellow;

module.exports.info = function(msg) {
  console.log(info(msg));
};

module.exports.warn = function(msg) {
  console.log(warn(msg));
};

module.exports.error = function(msg) {
  console.log(error(msg));
};

module.exports.debug = function(msg) {
  bunyan.info(msg);
};
