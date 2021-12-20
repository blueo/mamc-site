<script lang="ts" context="module">
	import type { PageTemplate } from '$lib/data';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page';

	export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
		const url = `/index.json`;
		const res = await fetch(url);

		if (res.ok) {
			const body: PageTemplate = await res.json();
			const props = body?.data;

			return {
				props
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import Hero from '$lib/Hero.svelte';
	import Blocks from '$lib/blocks/Blocks.svelte';
	import type { Block } from '$lib/blocks/types';
	import Footer from '$lib/Footer.svelte';
	import { getContext } from 'svelte';

	export let hero_text: string;
	export let hero_subtitle: string;
	export let hero_address: string;
	export let hero_image: string;
	export let title: string;
	export let home_page_blocks: Array<Block>;
	export let footer_address: string;
	export let footer_address_link: string;
	export let footer_email: string;
	export let footer_phone: string;

	const siteTitle = getContext('siteTitle');
</script>

<svelte:head>
	<title>{title} | {siteTitle}</title>
</svelte:head>
<main>
	<Hero address={hero_address} text={hero_text} image={hero_image} subtitle={hero_subtitle} />
	<section class="appeal">
	<a href="https://www.christmasappeal.org.nz">
		<img src="https://christmasappeal.org.nz/wp-content/uploads/2019/09/cws-christmas-appeal-2019.jpg" />
	</a>
</section>
	<Blocks blocks={home_page_blocks} />
</main>

<Footer {footer_address} {footer_email} {footer_phone} {footer_address_link} />

<style scoped lang="stylus">
	.appeal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media screen and (min-width: 600px) {
		.appeal img {
			min-height 35rem;
		}
	}
</style>