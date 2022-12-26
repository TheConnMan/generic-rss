var log4js = require('log4js');

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

var express = require('express');

var app = express();

var port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, function () {
  console.log(`Generic RSS Feed listening on port ${port}!`);
});
