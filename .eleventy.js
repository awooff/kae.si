const {DateTime: DT} = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const postcssInstagram = require('postcss-instagram');
const postcssUncss = require('postcss-uncss');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItAnchor = require('markdown-it-anchor');
const fs = require('fs');

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
  } catch (err) {
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
  evc.addPlugin(eleventyNavigationPlugin);
  evc.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true,
    },
    warningFileSize: 400 * 1000,
  });

  // Return the smallest number argument
  evc.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  /* Filter for dates with luxon */
  evc.addFilter('asPostDate', dateObj =>
    DT.fromJSDate(dateObj).toLocaleString(DT.DATE_MED)
  );

  evc.addFilter('readableDate', dateObj => {
    return DT.fromJSDate(dateObj, {zone: 'gmt'}).toFormat('dd LLL yyyy');
  });


  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  evc.addFilter('htmlDateString', (dateObj) => {
    return DT.fromJSDate(dateObj, {zone: 'gmt'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  evc.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  const filterTagList = tags => {
    return (tags || []).filter(tag => ['all', 'nav', 'pages', 'post', 'posts'].indexOf(tag) === -1);
  };
  evc.addFilter('filterTagList', filterTagList);

  /* Create an array of all these tags */
  evc.addCollection('tagList', collection => {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
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
    );
  });

  evc.addNunjucksShortcode('tech', () => {

  });

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
      level: [1,2,3,4],
    }),
    slugify: evc.getFilter('slug'),
  }).use(markdownItEmoji); // Use our emoji lib too~
  evc.setLibrary('md', markdownLibrary)
  evc.addFilter('markdown', content => markdownLibrary.render(content));
  evc.addPairedShortcode('markdown', content => md.render(content));

  // Override Browsersync defaults (used only with --serve)
  evc.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  /* And now our passthru copies! */
  evc.addPassthroughCopy('static/content');
  evc.addPassthroughCopy('static/img');
  evc.addPassthroughCopy('static/fonts');

  return {
    markdownTemplateEngine: 'njk',
    pathPrefix: "/",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
  };
};
