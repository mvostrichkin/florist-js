import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	let result = datafetcher.getArrayOfItems();
	console.log(result[1][1]);
	return {
		items: result,
		lastUpdated: datafetcher.getLastUpdated()
	};
};
