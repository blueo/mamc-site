<template>
  <div class="row">
    <div class="container">
      <section class="centred-media-block">
        <div class="content">
          <h2 v-if="title">{{ title }}</h2>
          <p>
            {{ content }}
          </p>
        </div>
        <figure class="fig">
          <picture
            ><img
              v-bind:alt="image_description"
              v-bind:src="imageSrc"
              v-bind:srcset="imageSrcSet"
              sizes="(max-width: 1000px) calc(100vw - 1rem), 1000px"
              loading="lazy"
            />
          </picture>
        </figure>
        <div class="cta">
          <a
            class="button button-dark"
            v-if="call_to_action"
            v-bind:href="call_to_action.link"
            >{{ call_to_action.text }}</a
          >
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
    image: {
      type: String,
    },
    image_description: {
      type: String,
    },
    call_to_action: {
      type: Object,
    },
  },
  computed: {
    imageSrc: (v) => {
      // default image size -> fallback to 2000px if srcset not supported
      return `https://res.cloudinary.com/dxbnubbez/c_scale,w_2000${v.image}`;
    },
    imageSrcSet: (v) => {
      // responsive image sizes
      const sets = [1600, 1400, 1200, 1000, 800, 600, 400].map((w) => {
        return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${v.image} ${w}w`;
      });

      return sets.join(", ");
    },
  },
};
</script>

<style lang="stylus" scoped>
h2 {
  color: var(--color-bluegreen);
}

.centred-media-block {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

figure {
  margin: 1.5rem 0.5rem;
  max-width: 1000px;
}

@media screen and (min-width: $breakpoint-desktop) {
  figure {
    margin: 1.5rem auto;
  }
}

.cta {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>