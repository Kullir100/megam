'use strict';

module.exports = function(app, db) {
  app.get('/', function(req, res) {
    res.status(200).send('app up and running');
  });
};
