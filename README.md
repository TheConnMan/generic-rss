# Generic RSS

Use jQuery to turn any page into an RSS feed

## Why?

Some pages are regularly updated, but there's no easy way to check the updates. Using Generic RSS, you can use jQuery syntax to turn any page into an RSS feed. Subscribe using [Slack RSS](https://slack.com/apps/new/A0F81R7U7-rss), [Feedly](https://feedly.com/), or any other RSS feed reader to get notified when a new image is published.

## Quickstart

Run with Docker by executing: `docker run -d -p 3000:3000 --name=generic-rss theconnman/generic-rss:latest`

To use point an RSS feed reader to `http://<url>:3000/<generic-user>/<generic-repo>.atom`. The easiest way to create a publicly accessible endpoint for an RSS reader is to use [Localtunnel](https://localtunnel.github.io/) to proxy a public location to your local **Generic RSS** instance.

## Local Development

# TODO

## Environment Variables

- **FLUENTD_HOST** (Optional) Fluent host for logging
- **FLUENTD_TAGS** (Optional) Add FluentD context tags (format is tag:value,tag2:value2)
- **TAGS_FETCH_LIMIT** (Optional) Fetch only the given number of tags (before being filtered). Useful for reducing traffic and avoiding possible time-outs.
- **PORT** (Default: 3000) Port to run the service on
