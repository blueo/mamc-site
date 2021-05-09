import glob from 'glob';
import xml from 'xmlbuilder2';
import pkg from '../../package.json';

/**
 * this endpoint is ONLY pre-rendered (@see svelte.config.js)
 * At time of writing tt does not work under npm run dev due
 * to some kind of module loading issue - it only runs server
 * side during the build
 */

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req: Request) {
	const sitemap = xml.create({ version: '1.0' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
	});
	const pages = glob.sync('./build/**/*.html');
	pages.forEach((page) => {
		const url = sitemap.ele('url');
		const path = `${pkg.url}${page.slice(7).replace('index.html', '')}`;
		url.ele('loc').txt(path);
		url.ele('changefreq').txt('weekly');
	});

	// todo create xml
	const body = sitemap.end({ prettyPrint: true });

	if (body === null) {
		return {
			status: 404
		};
	}

	return {
		headers: {
			'content-type': 'application/xml'
		},
		body
	};
}
