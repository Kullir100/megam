'use strict';

var userHelper = require('../helper/user_helper');
module.exports = function(app, db) {
  app.post('/temperature', function(req, res) {
    var userObject = userHelper.createUser(req, res);
    var fileName = req.body.device_id;
    db.save(fileName, userObject, function(err) {
      if (err) {
        console.log(err.message);
        res.status(500).send('Cannot save user details');
        return;
      }
      res.sendStatus(200);
    });
  });

  app.get('/temperature/:device_id', function(req, res) {
    var fileName = req.params.device_id;
    db.get(fileName, function(err, obj) {
      if (err) {
        console.log(err.message);
        res.status(404).send('Cannot find user details, please save them first.');
        return;
      }
      res.status(200).send(obj);
    });
  });
};
