import matter from 'gray-matter';
import glob from 'glob';
import path from 'path';
import keyBy from 'lodash.keyby';
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

export type ConfigObject = {
	content? :string;
	data: {
		[key: string]: any;
	};	
	isEmpty?: boolean;
	excerpt?: string;
	path: string;
	fileName: string;
	children?: Array<string>;
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
function combineFields(origin: matter.GrayMatterFile<string>, fields: Array<Field>): ConfigObject {
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

	return <ConfigObject> <unknown> origin;
}

const pageData = markdown.map((file) => {
	// default content template
	// @todo use template data to determine - good enough for now
	let template = 'content-page';
	let children: string[] = [];
	const relativeName = path.relative('./site/', file);
	const baseName = path.basename(file, '.md');
	let fileName = `${path.dirname(relativeName)}/${baseName}`;
	
	// for index pages use dirname
	if (baseName === 'index') {
		fileName = path.dirname(relativeName);

		// attach child page relations
		if (fileName !== '.') {
			const dir = path.dirname(file);
			children = glob
				.sync(`${dir}/**/*.md`)
				// get child paths - @todo handle index and sub paths etc
				.filter(child => path.basename(child, ".md") !== 'index')
				.map((child) => {
					const relativeName = path.relative('./site/', child);
					const baseName = path.basename(child, '.md');
					return `${path.dirname(relativeName)}/${baseName}`;
				});
			
		}
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

	if (children.length) {
		newConfig.children = children;
	}

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
