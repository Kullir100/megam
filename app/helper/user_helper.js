var uuid = require('node-uuid');

module.exports = {
  create_user: function(req) {
    return {
      user_id: uuid.v4(),
      data: {
        alarm_time: req.body.alarm_time,
        temperature: req.body.temperature
      }
    };
  }
};
