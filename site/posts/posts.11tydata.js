require('dotenv').config();

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todayDate = new Date();

const showDraft = data => {
	const isDraft = 'draft' in data && data.draft !== false;
	const isFutureDate = data.page.data > todayDate;
	return isDevEnv || (!isDraft && !isFutureDate);
};

module.exports = () => ({
	eleventyComputed: {
		eleventyExcludeFromCollections(data) {
			showDraft(data)
				? data.eleventyExcludeFromCollections
				: true;
		},
		permalink(data) {
			showDraft(data)
				? data.permalink
				: false;
		},
	},
});
