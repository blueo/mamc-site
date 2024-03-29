<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page';

	enum LeftRight {
		Left = 'left',
		Right = 'right'
	}

	type NavItem = {
		text: string;
		link: string;
		position: LeftRight;
		external: boolean;
	};

	type SiteConfig = {
		title: string;
		description: string;
		navigation: NavItem[];
	};

	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const url = `/config.json`;
		const res = await fetch(url);

		if (res.ok) {
			const body: SiteConfig = await res.json();

			return {
				props: { ...body }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import '../app.styl';
	import Logo from '../icons/logo.svelte';
	import Burger from '../icons/burger.svelte';
	import Close from '../icons/close.svelte';
	import { setContext } from 'svelte';

	export let title: string;
	export let description: string;
	export let navigation: NavItem[];

	let navActive = false;
	function toggleMobileNav() {
		navActive = !navActive;
	}

	setContext('siteTitle', title);
</script>

<svelte:head>
	<meta name="description" content={description} />

	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
	/>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-DT26VQWNFW"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-DT26VQWNFW');
	</script>
</svelte:head>

<header class="header">
	<nav class="navigation left">
		<ul>
			<li>
				<a href="/" class="brand">
					<Logo />
					MOUNT ALBERT METHODIST CHURCH
				</a>
			</li>
		</ul>
	</nav>

	<nav class="navigation right desktop-nav">
		<ul>
			{#each navigation as nav}
				<li>
					<a href={nav.link}>{nav.text}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<button class="mobile-nav-toggle" on:click={toggleMobileNav}>
		<Burger />
	</button>
	<div class="mobile-nav" class:mobile-nav--active={navActive}>
		<nav>
			<ul>
				{#each navigation as nav}
					<li>
						<a href={nav.link} on:click={toggleMobileNav}>{nav.text}</a>
					</li>
				{/each}
			</ul>
			<button class="mobile-nav-close" on:click={toggleMobileNav}>
				<Close />
			</button>
		</nav>
	</div>
</header>

<slot />

<style scoped lang="stylus">
	.header {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-left: 2vw;
		padding-right: 2vw;
		padding-top: 1.5rem;
		padding-bottom: 0.5vw;
		font-weight: 600;
		z-index: 10;
		color: var(--color-white);
	}

	.brand {
		color: var(--color-white);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		white-space: nowrap;
		margin-right: 1rem;
		font-size: 1rem;
	}

	.brand:visited {
		color: var(--color-white);
	}

	@media screen and (min-width: 600px) {
		.brand {
			text-align: center;
			white-space: normal;
			font-size: 1.5rem;
		}
	}

	:global(.brand .logo)
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;

	@media screen and (min-width: 600px)
		:global(.brand .logo)
			width: 4.8rem;
			height: 4.8rem;
			margin-right: 1.6rem;

	nav li {
		font-family: Montserrat-SemiBold, Montserrat;
	}

	.navigation {
		height: 3rem;
		display: flex;
		align-items: center;
	}

	.navigation ul {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.navigation li {
		list-style: none;
		margin-right: 1.5rem;
		user-select: none;
		cursor: pointer;
	}

	.navigation li:last-of-type {
		margin: 0;
	}

	.active {
		border-bottom: 1px solid #000;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:active {
		color: inherit;
		text-decoration: underline;
	}

	a:hover {
		text-decoration: underline;
	}

	a:visited {
		color: inherit;
	}

	.desktop-nav {
		display: none;
	}

	.mobile-nav {
		position: absolute;
		background: #ffffff;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding: 2rem;
		transform: translateY(-100%);
		transition: transform 0.35s ease-in-out;
		text-align: center;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		line-height: 2;
	}

	.mobile-nav nav {
		display: flex;
		flex-direction: column;
	}

	.mobile-nav li {
		list-style: none;
		cursor: pointer;
		transition: opacity 0.15s;
		color: var(--color-black);
	}

	.mobile-nav li:hover {
		opacity: 0.6;
	}

	.mobile-nav--active {
		transform: translateY(0);
	}

	.mobile-nav-close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		width: 3rem;
		height: 3rem;
		background-color: transparent;
		border: 0;
		transition: opacity 0.15s;
		cursor: pointer;
	}

	.mobile-nav-toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 3rem;
		height: 3rem;
		transition: opacity 0.15s;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}

	.mobile-nav-toggle:hover,
	.mobile-nav-close:hover {
		opacity: 0.6;
	}

	@media screen and (min-width: 1024px) {
		.desktop-nav {
			display: block;
		}
		.mobile-nav-toggle {
			display: none;
		}
		.mobile-nav {
			display: none;
		}
	}
</style>
