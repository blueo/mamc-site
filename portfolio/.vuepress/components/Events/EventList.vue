<template>
  <section class="event-list">
    <article v-for="post in events" :key="post.title" class="post">
      <router-link tag="h2" :to="post.path" class="title">{{
        post.frontmatter.title
      }}</router-link>
      <small>{{ post.frontmatter.start_datetime | DisplayDate }}</small>
      {{ post.frontmatter.body }}
    </article>
  </section>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$site.pages
        .filter(
          (x) => x.path.startsWith("/events/") && !x.frontmatter.events_index
        )
        .sort(
          (a, b) =>
            new Date(b.frontmatter.start_datetime) -
            new Date(a.frontmatter.start_datetime)
        );
    },
  },
};
</script>

<style scoped>
.title {
  cursor: pointer;
}
.post {
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
}
.post:last-of-type {
  border: 0;
}
.post h2 {
  margin: 0 0 1rem 0;
}
.post h2:hover {
  opacity: 0.6;
}
</style>
