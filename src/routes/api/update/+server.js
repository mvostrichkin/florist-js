import { error } from '@sveltejs/kit';

export const GET = ({ url }) => {
	return new Response(String('Everything is fine'));
};
