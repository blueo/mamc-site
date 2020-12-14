<template>
  <div class="row">
    <div class="container">
      <section class="content-block">
        <h2 class="title" v-if="title">{{ title }}</h2>
        <div class="content" v-html="content"></div>
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

<style lang="stylus" scoped>
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
  text-align: center;
  align-items: center;
}
</style>