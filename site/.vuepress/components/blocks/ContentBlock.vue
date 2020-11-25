<template>
  <div class="row">
    <div class="container">
      <section class="content-block">
        <div class="content">
          <h2 v-if="title">{{ title }}</h2>
          <p v-html="content"></p>
        </div>
      </section>
    </div>
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
      required: true,
    },
  },
};
</script>

<style lang="stylus">
h2 {
  color: var(--color-bluegreen);
}

.content-block {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
</style>