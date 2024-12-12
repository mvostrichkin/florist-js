import * as datafetcher from '$lib/server/datafetcher.js';

export const load = async ({ params }) => {
	let result = {};
	result.bouquets = datafetcher.getBouquetsWithFlower(params.slug);
	result.bouquets.flowerID = params.slug;
	result.lastUpdated = datafetcher.getLastUpdated();
  result.bouquetsQty = datafetcher.getBouquetsQty();

	return result;
};
