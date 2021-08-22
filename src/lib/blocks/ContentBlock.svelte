<script lang="ts">
	export let title: string;
	export let content: string;
</script>

<div class="row">
	<div class="container">
		<section class="content-block">
			{#if title}<h2 class="title">{title}</h2>{/if}
			<div class="content">{@html content}</div>
		</section>
	</div>
</div>

<style lang="stylus" scoped>
@import "../../global.styl";

.title {
  color: var(--color-bluegreen);
  width: auto;
}

.content-block {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;	
}

@media screen and (min-width: $breakpoint-desktop) {
	.content {
		padding: 0;
	}
}
</style>
