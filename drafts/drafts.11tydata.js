require('dotenv').config();

const isDevEnv = process.env.ELEVENTY_ENV === 'development';

module.exports = () => ({
	eleventyComputed: {
		eleventyExcludeFromCollections: data =>
			isDevEnv
				? data.eleventyExcludeFromCollections
				: true,
		permalink(data) {
			if (!isDevEnv) {
				return false;
			}

			return data.permalink === ''
				? data.page.filePathStem.replace('/drafts/', '/blog/') + '/'
				: data.permalink;
		},
	},
});
