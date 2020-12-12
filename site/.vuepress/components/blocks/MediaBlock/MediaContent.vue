<template>
  <div class="content">
    <h2 v-if="title">{{ title }}</h2>
    <p v-html="content"></p>
    <a
      class="button button-dark"
      v-if="callToAction"
      v-bind:href="callToAction.link"
      >{{ callToAction.text }}</a
    >
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    callToAction: {
      type: Object,
    },
  },
};
</script>
<style lang="stylus" scoped>
.content {
  padding: 2rem min(12vw, 6rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content p {
  font-size: 1.5rem;
  color: var(--color-white);
}

.content h2 {
  color: var(--color-bluegreen);
}

.button {
  margin-top: 2rem;
}
</style>