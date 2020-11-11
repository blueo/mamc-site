<template>
  <div class="wrapper">
    <Navbar :logo="$site.themeConfig.logo" :sticky="$route.path === '/'" />

    <main v-if="$route.path === '/'">
      <!-- Home page content -->
      <Hero
        :text="$page.frontmatter.hero_text"
        :subtitle="$page.frontmatter.hero_subtitle"
        :address="$page.frontmatter.hero_address"
        :image="$page.frontmatter.hero_image"
      />

      <Blocks :blocks="$page.frontmatter.home_page_blocks" />
    </main>

    <div class="container">
      <!-- about -->
      <div v-if="$route.path === '/about-us/'">
        <Content />
      </div>
    </div>

    <Footer
      :footer_title="$page.frontmatter.footer_title"
      :footer_address="$page.frontmatter.footer_address"
      :footer_address_link="$page.frontmatter.footer_address_link"
      :footer_phone="$page.frontmatter.footer_phone"
      :footer_email="$page.frontmatter.footer_email"
    />
  </div>
</template>

<script>
import MediaBlock from "../../components/blocks/MediaBlock.vue";
import Blocks from "../../components/blocks/Blocks.vue";

export default {
  components: {
    MediaBlock,
    Blocks,
  },
};
</script>


<style lang="stylus">
:root {
  --color-black: #333333;
  --color-white: #ffffff;
  --color-bluegreen: #12c1be;
  --color-highlight: rgba(249, 233, 172, 0.99);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*::-moz-selection {
  background: var(--color-highlight);
  color: var(--color-black);
}

*::-webkit-selection {
  background: var(--color-highlight);
  color: var(--color-black);
}

*::selection {
  background: var(--color-highlight);
  color: var(--color-black);
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  background: #fff;
  color: var(--color-black);
}

img {
  width: 100%;
  max-width: 100%;
  line-height: 0;
  margin: 2rem 0;
}

@media screen and (min-width: $breakpoint-desktop) {
  .container {
    // padding: 0 5vw;
    max-width: 1500px;
    margin: 0 auto;
  }
}

.news-list {
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6, p {
  width: 100%;
  max-width: 60ch;
}

h1, h2, h3, h4, h5, h6 {
  font-family: $font-family-heading;
}

h1 {
  font-size: 3rem;
  line-height: 1.15;
  font-weight: 300;
  margin: 0 auto 3rem auto;
}

h2 {
  font-size: 2rem;
  font-weight: 300;
  margin: 2rem auto 2rem auto;
}

h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 2rem auto 1rem auto;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  margin: 1rem auto 2rem auto;
}

pre {
  background: var(--color-black);
  padding: 1rem;
  margin: 1rem 0;
}

code {
  color: white;
  background: var(--color-black);
  font-size: 0.8rem;
  padding: 0.05rem 0.25rem;
  font-weight: 400;
}

textarea, input {
  font-size: 1.4rem;
  font-family: Montserrat, 'Helvetica Neue', sans-serif;
  font-weight: 300;
}

.row-dark {
  background-color: var(--color-black);
}

.row-green {
  background-color: var(--color-bluegreen);
}

// button for dark backgrounds
.button-dark {
  color: var(--color-bluegreen);
  padding: 2rem 2rem;
  border: var(--color-bluegreen) 2px solid;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-family: $font-family-heading;
  display: inline-block;
}

// solid button for dark backgrounds
.button-important {
  color: var(--color-black);
  background-color: var(--color-bluegreen);
  padding: 2rem 2rem;
  border: var(--color-bluegreen) 2px solid;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-family: $font-family-heading;
  display: inline-block;
}

// button for green backgrounds
.button-green {
  color: var(--color-black);
  background-color: var(--color-bluegreen);
  padding: 2rem 2rem;
  border: var(--color-black) 2px solid;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-family: $font-family-heading;
  display: inline-block;
}
</style>
