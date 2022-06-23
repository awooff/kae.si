const {DateTime: DT} = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const {EleventyServerlessBundlerPlugin} = require('@11ty/eleventy');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const Image = require('@11ty/eleventy-img');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItReplaceLink = require('markdown-it-replace-link');

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

const {builder} = require('@netlify/functions');
exports.handler = builder(handler);

// Create a shortcode for `sharp` optimized images.
async function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
  console.log(`Generating image(s) from:  ${src}`);
  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ['avif', 'jpeg'],
    urlPath: '/static/img/',
    outputPath: './_site/static/img',
    filenameFormat: (id, src, width, format, options) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
    sharpOptions: {
      animated: true,
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  metadata = Image.statsSync(src, options)
  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

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
  evc.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'art', // The serverless function name from your permalink object
    functionsDir: './netlify/functions/',
  });

  /* Foambubble wiki links */
  evc.addTransform('wiki-links', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      // We remove outer brackets from links
      const output = content.replace(/(\[+(\<a(.*?)\<\/a\>)\]+)/g, '$2');
      return output;
    }
    return content;
  });


  evc.addNunjucksAsyncShortcode('image', imageShortcode);

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

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    replaceLink: (link, env) => {
      const isRelativePattern = /^(?!http|\/).*/;
      const lastSegmentPattern = /[^\/]+(?=\/$|$)/i;
      const isRelative = isRelativePattern.test(link);

      if (isRelative) {
        const hasLastSegment = lastSegmentPattern.exec(env.page.url);
        // If it's nested, replace the last segment
        if (hasLastSegment && env.page.url) {
          return env.page.url.replace(lastSegmentPattern, link);
        }
        // If it's at root, just add the beginning slash
        return env.page.url + link;
      }

      return link;
    },
  })
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
      level: [1,2,3,4],
    }),
    slugify: evc.getFilter('slug'),
  })
  .use(markdownItEmoji) // Our deer emojis **must** work!
  .use(markdownItReplaceLink);

  evc.setLibrary('md', markdownLibrary)
  evc.addFilter('markdown', content => markdownLibrary.render(content));
  evc.addPairedShortcode('markdown', content => md.render(content));

  // Override Browsersync defaults (used only with --serve)
  evc.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
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
  });

  /* And now our passthru copies! */
  evc.addPassthroughCopy('static/content');
  evc.addPassthroughCopy('static/img');
  evc.addPassthroughCopy('static/fonts');
  evc.addPassthroughCopy('.well-known');

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
