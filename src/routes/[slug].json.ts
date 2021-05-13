import data from '$lib/data';
import type { Request } from '@sveltejs/kit';
import fs from 'fs';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }: Request) {
	let { slug } = params;

	if (slug === 'nothing') {
		slug = 'index';
	}

	// site config
	if (slug === 'config') {
		const body = JSON.parse(fs.readFileSync('site/config.json', 'utf8'));
		return {
			body
		};
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
