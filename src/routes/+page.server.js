import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	let result = {};
	result.bouquets = datafetcher.getCachedData();
	result.lastUpdated = datafetcher.getLastUpdated();
	result.bouquetsQty = datafetcher.getBouquetsQty();
	result.compositions = datafetcher.getCompositions().compositions;

	return result;
};
