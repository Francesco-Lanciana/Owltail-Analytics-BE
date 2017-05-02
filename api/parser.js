var parser = require('rss-parser');
var rss_feeds = require('../models/rss_feeds');

/*
Parse the rss feed registered in the database (Identification of the podcast is
sped up using the podcasts title). From here we can find the episode listened
to using the mp3 link.
*/
exports.fetchEpTitle = function(podTitle, mp3Link, device, done) {
  rss_feeds.getAll((rows) => {
    rows.forEach((r) => {

      parser.parseURL(r.url, function(error, parsed) {
        if (parsed.feed.title == podTitle) {
          parsed.feed.entries.some(function(entry) {
            //Delete when on own server
            if (entry.enclosure.url == ('http://www.podtrac.com/pts/redirect.mp3/' + mp3Link)) {
              done(podTitle, entry.title, device); // Might need a callback
              return true;
            }
          });
        }
      });

    });
  });
}
