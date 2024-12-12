import * as datafetcher from '$lib/server/datafetcher.js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  await datafetcher.writeDatatoFile();
	
	redirect(303, '/');
};
