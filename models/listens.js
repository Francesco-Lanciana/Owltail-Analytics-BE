var db = require('../db.js');

exports.create = function(podcast, episode, device) {

  var values = [
    podcast,
    episode,
    new Date().toISOString().slice(0, 19).replace('T', ' '),
    device
  ];

  console.log(values);

  db.get().query('INSERT INTO listens (podcast, episode, time, device) VALUES(?, ?, ?, ?)', values, function(error, result) {
    if (error) throw error;
  });
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM listens', function (error, rows) {
    if (error) throw error;
    done();
  });
}

// Allows for time based analytics
exports.getAllByTime = function(lThresh, uThresh, done) {
  db.get().query('SELECT * FROM listens WHERE time BETWEEN ? AND ?', lThresh, uThresh, function (error, rows) {
    if (error) throw error;
    done();
  });
}
