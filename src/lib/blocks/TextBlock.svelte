<script lang="ts">
	export let title: string;
	export let content: string;
	export let theme: string;

	function rowClass() {
		if (theme === 'dark') {
			return 'row-dark';
		}
		return 'row';
	}

	function contentClass() {
		if (this.theme === 'dark') {
			return 'content content--dark';
		}
		return 'content content--light';
	}
</script>

<div class={rowClass()}>
	<div class="container">
		<section class="text-block">
			<div class="content-container">
				{#if title}<h2 class="title">{title}</h2>{/if}
				<div class={contentClass()}>{@html content}</div>
			</div>
		</section>
	</div>
</div>

<style lang="stylus" scoped>
.text-block {
  display: flex;
  flex-direction: column;
}

.content-container {
  padding: 2rem min(12vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content p {
  font-size: 1.5rem;
}

.title {
  text-align: center;
  color: var(--color-bluegreen);
}

.content--dark {
  color: var(--color-white);

  p {
    color: var(--color-white);
  }
}

.content--light {
  p {
    color: var(--color-black);
  }
}
</style>
