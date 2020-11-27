<template>
  <div class="wrapper">
    <Navbar :logo="$site.themeConfig.logo" :sticky="$route.path === '/'" />

    <main class="container">
      <!-- Single news item view -->
      <section>
        <h1>{{ $page.frontmatter.title }}</h1>
        <small>{{ $page.frontmatter.date }}</small>

        {{ $page.frontmatter.body }}
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  computed: {},
};
</script>
