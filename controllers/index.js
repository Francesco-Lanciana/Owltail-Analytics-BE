var express = require('express');
var router = express.Router();

router.use('/podcast', require('./podcast'));
//router.use('/analytics', require('./analytics'));

router.get('/', function(req, res) {
  res.send('<p>some html</p>');
});

module.exports = router;
