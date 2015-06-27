var user_helper = require('../helper/user_helper'),
user_name = "user";

module.exports = function(app, db) {
  app.post('/temperature', function(req, res) {
    var user_object = user_helper.create_user(req, res);
    db.save(user_name, user_object, function(err) {
      if (err) {
        console.log(err.message);
        res.status(500).send('Cannot save user details');
        return;
      }
      res.sendStatus(201);
    });
  });

  app.get('/temperature', function(req, res) {
    db.get(user_name, function(err, obj) {
      if (err) {
        console.log(err.message);
        res.status(404).send('Cannot find user details, please save them first.');
        return;
      }
      res.status(200).send(obj);
    });
  });
};
