import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	return {
		items: datafetcher.getArrayOfItems()
	};
};
