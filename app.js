var express = require('express');
var app = express();

var db = require('./db');
var port = process.env.PORT || 3000;

app.use(require('./controllers'));

// Connect to MySQL on start
db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(port, function() {
      console.log(`Listening on port ${port}...`);
    })
  }
})
