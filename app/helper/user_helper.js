var uuid = require('node-uuid');

module.exports = {
  create_user: function(req, res) {
    if (req.body.hour === undefined || req.body.minute === undefined || req.body.temperature === undefined) {
      res.sendStatus(500);
      return;
    }

    return {
      user_id: uuid.v4(),
      data: {
        hour: req.body.hour,
        minute: req.body.minute,
        temperature: req.body.temperature
      }
    };
  }
};
