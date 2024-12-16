import * as datafetcher from '$lib/server/datafetcher.js';

export const GET = async ({ url }) => {
  let xlsxFile = datafetcher.getNewDataAndCreateXLSX();
	
	return new Response(200, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    body: xlsxFile
  });
};
