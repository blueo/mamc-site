import data from '$lib/data';
import type { Request } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }: Request) {
	let { slug } = params;

	if (slug === 'nothing') {
		slug = 'index';
	}

	const body = data(slug);

	if (body === null) {
		return {
			status: 404
		};
	}

	return {
		body
	};
}
