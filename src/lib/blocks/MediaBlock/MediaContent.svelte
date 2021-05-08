<script lang="ts">
	import type { CallToActionField } from '../types';

	export let title: string;
	export let content: string;
	export let theme: string;
	export let callToAction: CallToActionField;

	function contentClass() {
		if (theme === 'light') {
			return 'content content--light';
		}
		return 'content content--dark';
	}
</script>

<div class="container">
	{#if title}
		<h2 class="title">{title}</h2>
	{/if}
	<div class={contentClass()}>{@html content}</div>
	{#if callToAction.link}
		<a class="button button-dark" href={callToAction.link}>{callToAction.text} </a>
	{/if}
</div>

<style lang="stylus" scoped>
  
.container {
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

.button {
  margin-top: 2rem;
}
</style>
