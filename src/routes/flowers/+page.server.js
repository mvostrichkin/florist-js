import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	let result = {};
	result.lastUpdated = datafetcher.getLastUpdated();
	result.compositions = datafetcher.getCompositions().compositions;
  result.bouquetsQty = datafetcher.getBouquetsQty();

	return result;
};
