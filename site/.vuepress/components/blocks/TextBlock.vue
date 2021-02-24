<template>
  <div v-bind:class="rowClass">
    <div class="container">
      <section class="text-block">
        <div class="content-container">
          <h2 class="title" v-if="title">{{ title }}</h2>
          <div v-bind:class="contentClass" v-html="content"></div>
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
    },
  },
};
</script>
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