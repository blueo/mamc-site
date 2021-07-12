<script lang="ts" context="module">
	import type { ConfigObject } from '$lib/data';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page';

	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const url = `/news.json`;
		const res = await fetch(url);

		if (res.ok) {
			const body: ConfigObject = await res.json();
			const data = body?.data;
			const childPages = body?.children
			let children;
			if (childPages && childPages.length ) {
				children = await Promise.all(childPages.map( async (child) => {
					const childUrl = `${child}.json`;
					const res = fetch(childUrl)
						.then(res => res.json())
						.then((body) => {
							console.log(body);
							const data: ConfigObject = body?.data;
							return data;
						} )
					return res;
				}));

			}

			return {
				props: {...data, children} 
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">

	type NewsItem = {
		title: string;
		body: string;
		date: string;
		attachments: [];
	};

	import Hero from '$lib/Hero.svelte';
	import Blocks from '$lib/blocks/Blocks.svelte';
	import type { Block } from '$lib/blocks/types';
	import Footer from '$lib/Footer.svelte';
	import { getContext } from 'svelte';
	import TextBlock from '$lib/blocks/TextBlock.svelte';
import NewsItemBlock from '$lib/blocks/NewsItemBlock.svelte';

	export let hero_text: string;
	export let hero_subtitle: string;
	export let hero_address: string;
	export let hero_image: string;
	export let title: string;
	export let footer_address: string;
	export let footer_address_link: string;
	export let footer_email: string;
	export let footer_phone: string;

	export let children: Array<NewsItem>;
	
	const siteTitle = getContext('siteTitle');
</script>

<svelte:head>
	<title>{title} | {siteTitle}</title>
</svelte:head>
<main>
	<Hero address={hero_address} text={hero_text} image={hero_image} subtitle={hero_subtitle} />

	<ul>
		{#each children as child}
			<li>
				<NewsItemBlock title={child.title} content={child.body} date={child.date}/>
			</li>
		{/each}
	</ul>
</main>

<Footer {footer_address} {footer_email} {footer_phone} {footer_address_link} />
