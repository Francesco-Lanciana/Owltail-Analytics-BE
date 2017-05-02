var db = require('../db.js');

exports.create = function(url) {
  db.get().query('INSERT INTO rss_feeds WHERE url = ?', url, function (error, results, fields) {
    if (error) throw error;
    // connected!
  });
};

exports.getAll = function(done) {
  db.get().query('SELECT * FROM rss_feeds', function (error, rows) {
    if (error) throw error;
    done(rows);
  });
};
