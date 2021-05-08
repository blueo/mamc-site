<script lang="ts">
	export const hydrate = false;

	export let text: string;

	export let subtitle: string;

	export let address: string = '';

	export let image: string;

	let heroImage;
	let heroSrcSet;
	function heroImageFn(image: string) {
		// default image size -> fallback to 2000px if srcset not supported
		return `https://res.cloudinary.com/dxbnubbez/c_scale,w_2000${image}`;
	}
	function heroSrcSetFn(image: string) {
		// responsive image sizes
		const sets = [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400].map((w) => {
			return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${image} ${w}w`;
		});

		return sets.join(', ');
	}
	$: {
		heroSrcSet = heroSrcSetFn(image);
		heroImage = heroImageFn(image);
	}
</script>

<section>
	<figure class="hero-fig">
		<picture>
			<img src={heroImage} srcset={heroSrcSet} sizes="100vw" alt={text} />
		</picture>
		<figcaption class="hero-figcaption">
			{#if text}
				<h1 v-if="text" class="title">{@html text}</h1>
			{/if}
			{#if subtitle}
				<p class="subtitle">{@html subtitle}</p>
			{/if}
			{#if address}
				<p class="address">{@html address}</p>
				<a
					class="map-button button-green"
					href="https://goo.gl/maps/tyzoLaZBJoVQHV9Y6"
					target="_blank"
					rel="noopener"
					title="directions (opens in a new window)"
				>
					Directions
					<span class="visually-hidden">opens in a new window</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="white"
							d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"
						/>
					</svg>
				</a>
			{/if}
		</figcaption>
	</figure>
</section>

<style lang="stylus" scoped>
	.hero-fig {
		display: flex;
		justify-content: center;
		position: relative;
		background-color: black; /** no var used as only for img opacity */
		overflow: hidden;
		min-height: 50vh;
	}

	.hero-fig picture {
		position: absolute;
		object-fit: cover;
		height: 100%;
	}

	.hero-fig picture img {
		height: 100%;
		width: auto;
		max-width: none;
		opacity: 0.7;
		margin: 0px;
	}

	@media screen and (min-width: 600px) {
		.hero-fig {
			min-height: calc(0.5 * 100vw);
		}

		.hero-fig picture img {
			height: auto;
		}
	}

	.hero-figcaption {
		color: var(--color-white);
		/** above img */
		z-index: 1;
		display: flex;
		flex-direction: column;
		padding-top: 2rem;
		padding-bottom: 2rem;
		text-align: center;
		max-width: 100%;
	}

	@media screen and (min-width: 600px) {
		.hero-figcaption {
			padding-top: 5rem;
		}
	}

	.title {
		/*
      fluid typography calc see https://css-tricks.com/snippets/css/fluid-typography/
      calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
    */
		font-size: calc(21px + (48 - 18) * ((100vw - 300px) / (1600 - 300)));
		font-weight: 300;
		line-height: 1.25;
		letter-spacing: 0.1rem;
		width: 800px;
		max-width: 100%;
		margin: 18vw auto auto auto;
	}

	@media screen and (min-width: 600px) {
		.title {
			margin: 2vw auto auto auto;
		}
	}

	.subtitle {
		font-size: calc(18px + (32 - 16) * ((100vw - 300px) / (1600 - 300)));
		margin-top: 0;
	}

	.address {
		font-size: calc(14px + (18 - 12) * ((100vw - 300px) / (1600 - 300)));
		margin-top: 0;
	}

	.map-button {
		/* icon from https://iconmonstr.com/location-24-svg/ */
		align-self: center;
		color: var(--color-black);
		background-color: var(--color-bluegreen);
		border: none;
		padding: 14px;
		cursor: pointer;
		font-size: calc(16px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
		margin-top: 20px;
		display: flex;
		align-items: center;
	}

	.map-button svg {
		margin-left: 1rem;
	}

	.map-button > svg > path {
		fill: var(--color-black);
	}
</style>
