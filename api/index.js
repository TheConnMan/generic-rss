import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import RSS from 'rss';

import log4js from 'log4js';
var logger = log4js.getLogger();

export async function api(req, res) {
  try {
    const response = await fetch(req.query.page);
    const html = await response.text();
    const parsed = parse(html).querySelectorAll(req.query.query);
    res.setHeader('Content-Type', 'text/xml');
    res.send(formatRSS(req.query.page, parsed));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}

function formatRSS(page, elements) {
  var feed = new RSS({
    title: `${page} Elements`
  });
  elements.forEach(element => {
    feed.item({
      title: element.innerText,
      url: page
    });
  });
  return feed.xml();
}