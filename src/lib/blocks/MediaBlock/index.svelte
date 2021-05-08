<script lang="ts">
	import MediaImage from './MediaImage.svelte';
	import MediaContent from './MediaContent.svelte';
	import type { CallToActionField } from '../types';

	export let title: string;
	export let content: string;
	export let colour_scheme: string;
	export let image: string;
	export let image_description: string;
	export let image_right: string;
	export let image_orientation: string;
	export let call_to_action: CallToActionField;

	function imageSrc() {
		// default image size -> fallback to 2000px if srcset not supported
		return `https://res.cloudinary.com/dxbnubbez/c_scale,w_2000${image}`;
	}

	function imageSrcSet() {
		// responsive image sizes
		const sets = [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400].map((w) => {
			return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${image} ${w}w`;
		});

		return sets.join(', ');
	}

	function rowClass() {
		if (colour_scheme === 'light') {
			return 'row';
		}
		return 'row-dark';
	}

	function imageRight(): boolean {
		return image_orientation === 'right';
	}
</script>

<div class={rowClass()}>
	<div class="container">
		<section class="media-block">
			{#if imageRight()}
				<MediaContent {title} {content} callToAction={call_to_action} theme={colour_scheme} />
				<MediaImage
					imageDescription={image_description}
					imageSrc={imageSrc()}
					imageSrcSet={imageSrcSet()}
					imageOrientation={image_orientation}
				/>
			{:else}
				<MediaImage
					imageDescription={image_description}
					imageSrc={imageSrc()}
					imageSrcSet={imageSrcSet()}
					imageOrientation={image_orientation}
				/>
				<MediaContent {title} {content} callToAction={call_to_action} theme={colour_scheme} />
			{/if}
		</section>
	</div>
</div>

<style lang="stylus" scoped>
  @import "../../../global.styl";
  
.media-block {
  display: flex;
  flex-direction: column;
}

@media (min-width: $breakpoint-large) {
  .media-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
