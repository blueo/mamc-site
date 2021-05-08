<script lang="ts">
	export let content: string;
	export let button_text: string;
	export let button_link: string;
</script>

<div class="row-green">
	<div class="container">
		<section class="call-to-action-block">
			<span class="content">{content}</span>
			<a class="button button-green" href={button_link}>
				{button_text}
			</a>
		</section>
	</div>
</div>

<style lang="stylus" scoped>
  @import "../../global.styl";

.call-to-action-block {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  flex-wrap: wrap;
  text-align: center;
}

.call-to-action-block > * {
  color: var(--color-black);
  margin-top: 1rem;
}

@media screen and (min-width: $breakpoint-desktop) {
  .call-to-action-block > * {
    margin-top: 0;
  }
}

.content {
  font-size: 2rem;
  font-family: $font-family-heading;
  text-transform: uppercase;
}

.button {
  font-size: 2rem;
}
</style>
