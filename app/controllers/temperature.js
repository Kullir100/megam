'use strict';

var user_helper = require('../helper/user_helper');
module.exports = function(app, db) {
  app.post('/temperature', function(req, res) {
    var user_object = user_helper.create_user(req, res);
    var file_name = req.body.device_id;
    db.save(file_name, user_object, function(err) {
      if (err) {
        console.log(err.message);
        res.status(500).send('Cannot save user details');
        return;
      }
      res.sendStatus(200);
    });
  });

  app.get('/temperature/:device_id', function(req, res) {
    var file_name = req.params.device_id;
    db.get(file_name, function(err, obj) {
      if (err) {
        console.log(err.message);
        res.status(404).send('Cannot find user details, please save them first.');
        return;
      }
      res.status(200).send(obj);
    });
  });
};
