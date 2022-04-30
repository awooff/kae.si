const {DateTime: DT} = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const postcssInstagram = require('postcss-instagram');
const postcssUncss = require('postcss-uncss');

const handler = async event => {
  const elev = new EleventyServerless('serverless', {
    path: event.path, // required, the URL path
    query: event.queryStringParameters, // optional
  });

  try {
    // Returns the HTML for the Eleventy template that matches to the URL
    // Can use with `eleventyConfig.dataFilterSelectors` to put data cascade data into `page.data` here.
    let [page] = await elev.getOutput();
    let html = page.content;

    return {
      statusCode: 200,
      body: html
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: err.message}),
    };
  }
};

exports.handler = handler;

module.exports = evc => {
  /* Add our plugins. */
  evc.addPlugin(syntaxHighlight);
  evc.addPlugin(pluginRss);
  evc.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true,
    },
    warningFileSize: 400 * 1000,
  });

  /* Filter for dates with luxon */
  evc.addFilter('asPostDate', dateObj =>
    DT.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  );

  /* Add our collections here */
  evc.addCollection('posts', collectionApi => {
    // Get unsorted items
    return collectionApi.getAllSorted().reverse();
  });

  /* Add minified PostCSS & other plugins! */
  evc.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postCss([
      postcssInstagram, /* https://github.com/azat-io/postcss-instagram */
      postcssUncss, /* https://github.com/uncss/postcss-uncss */
    ])
    .process(cssCode)
    .then(
      r => done(null, r.css),
      e => done(e, null)
    )
  });
  /* And now our passthru copies! */
  evc.addPassthroughCopy('static/img');
  evc.addPassthroughCopy('static/fonts');

  return {markdownTemplateEngine: 'njk'};
};
