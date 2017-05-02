var express = require('express');

var parser = require('../api/parser');
var listens = require('../models/listens');
var MobileDetect = require('mobile-detect');

var recordRouter = express.Router();
var redirectRouter = express.Router({mergeParams: true});

// you can nest routers by attaching them as middleware:
recordRouter.use('/:podcastTitle/redirect', redirectRouter);

// May be useful to tell users who view podcast and don't select episodes
recordRouter.route('/:podcastTitle')
    .get(function (req, res) {
        res.status(200)
            .send(req.params.podcastTitle);
    });

redirectRouter.route(/(.+)/)
    .all(function (req, res, next) {
      var mp3URL = req.params['0'].slice(1);
      //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      //console.log(fullUrl);
      //var mp3URL = fullUrl;
      var device = classify(req.headers['user-agent']);

      parser.fetchEpTitle(req.params.podcastTitle, mp3URL, device, (pod, ep, device) => {
        listens.create(pod, ep, device);
      });

       //This might need to be a promise based thing
      //listens.create(req.params.podcastTitle, epTitle, md.os());
      next();
    });

var classify = function(userAgent) {
  var md = new MobileDetect(userAgent);

  if (md.phone()) {
    if (md.phone() != 'iPhone') {
      return 'Android';
    } else {
      return 'iPhone';
    }
  } else if (md.tablet()) {
    return 'Tablet';
  } else if (md.match('Mac')) {
    return 'Mac';
  } else if (md.is('Watch')) {
    return 'Watch';
  } else {
    return 'Unknown'
  }
};

module.exports = recordRouter;
