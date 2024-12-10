import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	let result = datafetcher.getCachedData();
	result.lastUpdated = datafetcher.getLastUpdated();
	console.log(result);

	return result;
};
