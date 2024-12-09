import * as datafetcher from '$lib/server/datafetcher.js';

export const GET = async ({ url }) => {
  await datafetcher.writeDatatoFile();
	
	return new Response(String('ok'));
};
