import matter from 'gray-matter';
import glob from 'glob';
import path from 'path';
import { keyBy } from 'lodash-es';
const files = glob.sync('./.forestry/front_matter/templates/*.yml');

const templates: Array<PageTemplate | BlockTemplate> = files.map((file) => {
	const fileName = path.basename(file, '.yml');
	const config = matter.read(file);
	return {
		fileName,
		...config,
		data: {
			fields: config.data.fields
		}
	};
});

interface Field {
	description?: string;
	name: string;
	label?: string;
	type: string;
	default?: string;
}

interface Template {
	content?: string;
	data: {
		fields: Array<Field>;
	};
	label?: string;
	fileName: string;
}

export interface PageTemplate extends Template {
	content?: string;
	data: {
		fields: Array<Field>;
	};
	label?: string;
	pages?: Array<string>;
}

interface BlockTemplate extends Template {}

type ContentTemplate = {
	[key: string]: PageTemplate | BlockTemplate;
};
const contentTemplates: ContentTemplate = keyBy(templates, 'fileName');

const markdown = glob.sync('./site/**/*.md');

/**
 * Updates origin object with default values from
 * template fields
 *
 * @param origin
 * @param fields
 */
function combineFields(origin: matter.GrayMatterFile<string>, fields: Array<Field>): Object {
	fields.forEach((field: Field) => {
		if (field?.default) {
			//handle default value
			const { default: defaultValue, name } = field;
			// simple check if the value exists
			const originValue = origin?.data[name];
			const hasValue = originValue !== undefined && originValue !== '';

			if (hasValue) {
				return field;
			}

			origin.data[name] = defaultValue;
		}

		switch (field?.type) {
			case 'include': {
				// handle include fields
				if (field?.type !== 'include') {
					return field;
				}

				const include = contentTemplates[field?.name];
				const includeFields = include?.data?.fields;
				if (!includeFields) {
					return field;
				}

				combineFields(origin, includeFields);

				return;
			}
			case 'blocks': {
				const { name } = field;
				const originBlocks = origin?.data[name];

				if (!originBlocks) {
					return;
				}

				originBlocks.forEach((block) => {
					const blockTemplate = contentTemplates[block?.template];
					if (!blockTemplate) {
						return;
					}
					const templateFields = blockTemplate?.data?.fields;
					templateFields.forEach((field) => {
						if (field?.default) {
							//handle default value
							const { default: defaultValue, name } = field;
							// simple check if the value exists
							const originValue = block[name];
							const hasValue = originValue !== undefined && originValue !== '';

							if (hasValue) {
								return field;
							}

							block[name] = defaultValue;
						}
					});
				});
				return;
			}
		}
	});

	return origin;
}

const pageData = markdown.map((file) => {
	// default content template
	// @todo use template data to determine - good enough for now
	let template = 'content-page';
	let fileName = '';
	const baseName = path.basename(file, '.md');
	if (baseName === 'index') {
		fileName = path.dirname(path.relative('./site/', file));
	}

	//special case for homepage
	if (fileName === '.') {
		fileName = 'index';
		template = 'home';
	}

	const config = matter.read(file);
	delete config.orig;

	// merge in template default data
	const pageTemplate = contentTemplates[template];

	if (!pageTemplate) {
		return {
			fileName,
			...config
		};
	}

	const fields: Array<Field> = pageTemplate?.data?.fields;
	if (!fields) {
		return;
	}

	const newConfig = combineFields(config, fields);

	return {
		...newConfig,
		fileName
	};
});

const pages = keyBy(pageData, 'fileName');

/**
 * function to get frontmatter data for pages
 */

export default function load(slug: string) {
	const pageData = pages[slug];

	if (!pageData) {
		return null;
	}

	return pageData;
}
