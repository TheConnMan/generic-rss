import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import RSS from 'rss';

import log4js from 'log4js';
var logger = log4js.getLogger();

export async function api(req, res) {
  const page = req.query.page;
  const elementQuery = req.query.query;
  const titleQuery = req.query.titleQuery;
  const descriptionQuery = req.query.descriptionQuery;
  const dateQuery = req.query.dateQuery;
  const linkQuery = req.query.linkQuery;
  logger.info('RSS request for ' + page);
  try {
    const response = await fetch(page);
    const html = await response.text();
    const parsed = parse(html).querySelectorAll(elementQuery);
    res.setHeader('Content-Type', 'text/xml');
    res.send(formatRSS(page, parsed, titleQuery, descriptionQuery, dateQuery, linkQuery));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}

function formatRSS(page, elements, titleQuery, descriptionQuery, dateQuery, linkQuery) {
  var feed = new RSS({
    title: `${page} Elements`
  });
  elements.forEach(element => {
    feed.item({
      title: (titleQuery ? element.querySelector(titleQuery) : element).innerText,
      description: descriptionQuery ? element.querySelector(descriptionQuery).innerText : null,
      date: dateQuery ? element.querySelector(dateQuery).innerText : null,
      url: getLink(page, element, linkQuery)
    });
  });
  return feed.xml();
}

function getLink(page, element, linkQuery) {
  if (!linkQuery) {
    return page;
  }
  const link = element.querySelector(linkQuery).getAttribute('href');
  if (link && link[0] == '/') {
    return new URL(page).hostname + link;
  }
  return link;
}