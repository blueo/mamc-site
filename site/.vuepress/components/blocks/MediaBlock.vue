<template>
  <div class="row-dark">
    <div class="container">
      <section class="media-block">
        <div class="content">
          <h2 v-if="title">{{ title }}</h2>
          <p>
            {{ content }}
          </p>
          <a
            class="button button-dark"
            v-if="call_to_action"
            v-bind:href="call_to_action.link"
            >{{ call_to_action.text }}</a
          >
        </div>
        <figure class="fig">
          <picture
            ><img
              v-bind:alt="image_description"
              v-bind:src="imageSrc"
              v-bind:srcset="imageSrcSet"
              sizes="100vw, 45vw"
            />
          </picture>
        </figure>
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
      const sets = [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400].map(
        (w) => {
          return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${v.image} ${w}w`;
        }
      );

      return sets.join(", ");
    },
  },
};
</script>
<style lang="stylus" scoped>
.media-block {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: $breakpoint-desktop) {
  .media-block {
    flex-direction: row;
  }

  .media-block > * {
    flex: 1 1 0%;
  }
}

.content {
  padding: 2rem min(12vw, 6rem);
  text-align: center;
}

.content p {
  font-size: 1.5rem;
  color: var(--color-white);
}

.content h2 {
  color: var(--color-bluegreen);
}

.fig {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 42rem;
}

.fig picture {
  position: absolute;
  object-fit: cover;
  height: 100%;
}

.fig picture img {
  height: 100%;
  width: auto;
  max-width: none;
  margin: 0px;
}

.button {
  margin-top: 2rem;
}
</style>