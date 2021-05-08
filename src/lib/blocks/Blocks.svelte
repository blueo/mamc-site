<script lang="ts">
	import type { Block } from './types';
	import blockMap from './block-map';
	export let blocks: Array<object>;

	let children;
	$: {
		function blockChildren() {
			// loop through blocks and match template to components
			return blocks.map(({ template, ...props }: Block) => {
				return {
					Component: blockMap[template],
					props
				};
			});
		}
		// loop through blocks and match template to components
		children = blockChildren();
	}
</script>

{#each children as { Component, props }}
	<section>
		<Component {...props} />
	</section>
{/each}
