import data from '$lib/data';
import type { Request } from '@sveltejs/kit';
import fs from 'fs';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }: Request) {
	let { slug, dir } = params;

	if (slug === 'nothing') {
		slug = 'index';
	}

	const body = data(`${dir}/${slug}`);

	if (body === null) {
		return {
			status: 404
		};
	}

	return {
		body
	};
}
