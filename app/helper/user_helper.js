'use strict';

module.exports = {
  create_user: function(req, res) {
    if (req.body.device_id === undefined || req.body.hour === undefined || req.body.minute === undefined || req.body.temperature === undefined) {
      res.sendStatus(400);
      return;
    }

    return {
      hour: req.body.hour,
      minute: req.body.minute,
      temperature: req.body.temperature,
      device_id: req.body.device_id
    };
  }
};
