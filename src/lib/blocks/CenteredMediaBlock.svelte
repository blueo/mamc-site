<script lang="ts">
	import type { CallToActionField } from './types';

	export let title: string;
	export let content: string;
	export let image: string;
	export let image_description: string;
	export let call_to_action: CallToActionField;

	function imageSrc() {
		// default image size -> fallback to 2000px if srcset not supported
		return `https://res.cloudinary.com/dxbnubbez/c_scale,w_2000${image}`;
	}

	function imageSrcSet() {
		// responsive image sizes
		const sets = [1600, 1400, 1200, 1000, 800, 600, 400].map((w) => {
			return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${image} ${w}w`;
		});

		return sets.join(', ');
	}
</script>

<div class="row">
	<div class="container">
		<section class="centred-media-block">
			<div class="content">
				{#if title}
					<h2>{title}</h2>
				{/if}
				<p>
					{@html content}
				</p>
			</div>
			<figure class="fig">
				<picture
					><img
						alt={image_description}
						src={imageSrc()}
						srcset={imageSrcSet()}
						sizes="(max-width: 1000px) calc(100vw - 1rem), 1000px"
						loading="lazy"
					/>
				</picture>
			</figure>
			<div class="cta">
				{#if call_to_action}
					<a class="button button-dark" href={call_to_action.link}>{call_to_action.text}</a>
				{/if}
			</div>
		</section>
	</div>
</div>

<style lang="stylus" scoped>
  @import "../../global.styl";
h2 {
  color: var(--color-bluegreen);
}

.centred-media-block {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

figure {
  margin: 1.5rem 0.5rem;
  max-width: 1000px;
}

@media screen and (min-width: $breakpoint-desktop) {
  figure {
    margin: 1.5rem auto;
  }
}

.cta {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>
