<template>
  <div class="container">
    <h2 class="title" v-if="title">{{ title }}</h2>
    <div v-bind:class="contentClass" v-html="content"></div>
    <a
      class="button button-dark"
      v-if="callToAction.link"
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
    theme: {
      type: String,
    },
  },
  computed: {
    contentClass() {
      console.log(this.theme);
      if (this.theme === "light") {
        return "content content--light";
      }
      return "content content--dark";
    },
  },
};
</script>
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