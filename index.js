import { api } from './api/index.js';

import log4js from 'log4js';

if (process.env.FLUENTD_HOST) {
  var tags = (process.env.FLUENTD_TAGS ? process.env.FLUENTD_TAGS.split(',') : []).reduce((allTags, tag) => {
    var pair = tag.split(':');
    allTags[pair[0].trim()] = pair.length === 1 ? true : pair[1].trim();
    return allTags;
  }, {});
  tags.function = 'GenericRSS';
  log4js.addAppender(require('fluent-logger').support.log4jsAppender('generic-rss', {
    host: process.env.FLUENTD_HOST,
    timeout: 3.0,
    tags: tags
  }));
}

import express from 'express';

var app = express();

app.use(express.static('public'));

app.get('/rss', function (req, res) {
  api(req, res);
});

var port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, function () {
  console.log(`Generic RSS Feed listening on port ${port}!`);
});
