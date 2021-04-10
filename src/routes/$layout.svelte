<script lang="ts">
	import '../app.scss';
	import Logo from '../logo.svelte';
	const navLinks = [
		{
			text: 'Home',
			link: '/',
			position: 'left',
			external: false
		},
		{
			text: 'Services and Events',
			link: '/services-and-events',
			position: 'right'
		},
		{
			text: 'Giving',
			link: '/giving',
			position: 'right',
			external: false
		},
		{
			text: 'About us',
			link: '/about-us',
			position: 'right',
			external: false
		}
	];
</script>

<header class="header">
	<nav class="navigation left">
		<ul>
			<li>
				<a href="/" class="brand">
					<Logo className="logo" />
					MOUNT ALBERT METHODIST CHURCH
				</a>
			</li>
		</ul>
	</nav>

	<nav class="navigation right desktop-nav">
		<ul>
			{#each navLinks as nav}
				<li>
					<a href={nav.link}>{nav.text}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<button class="mobile-nav-toggle">
		<!-- @click="toggleMobileNav" -->
		<!-- <Burger /> -->
	</button>
	<div class="mobile-nav">
		<!-- /**'mobile-nav--active': mobileNavActive */ -->
		<nav>
			<ul>
				{#each navLinks as nav}
					<li>
						<a href={nav.link}>{nav.text}</a>
					</li>
				{/each}
			</ul>
			<button class="mobile-nav-close">
				<!-- @click="toggleMobileNav" -->
				<!-- <Close /> -->
			</button>
		</nav>
	</div>
</header>

<slot />
