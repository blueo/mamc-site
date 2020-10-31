<template>
  <section>
    <figure class="hero-fig">
      <picture>
        <img v-bind:src="heroImage" v-bind:srcset="heroSrcSet" sizes="100vw"/>
      </picture>
      <figcaption class="hero-figcaption">
        <h1 v-if="text" class="title" v-html="text" />
        <p v-if="subtitle" class="subtitle" v-html="subtitle" />
        <p v-if="address" class="address" v-html="address" />
        <form class="map-form" action="https://goo.gl/maps/tyzoLaZBJoVQHV9Y6" target="_blank" rel="noopener">
          <button class="map-button" type="submit">
            Directions
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
          </button>
        </form>
      </figcaption>
    </figure>
  </section>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    heroImage: (v) => {
      // default image size -> fallback to 2000px if srcset not supported
      return `https://res.cloudinary.com/dxbnubbez/c_scale,w_2000${v.image}`
    },
    heroSrcSet: (v) => {
      // responsive image sizes
      const sets =  [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400].map((w) => {
        return `https://res.cloudinary.com/dxbnubbez/c_scale,w_${w}${v.image} ${w}w`;
      });
      
      return sets.join(', ');
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

.hero-fig {
  display: flex;
  justify-content: center;
  position: relative;
  background-color: black; /** no var used as only for img opacity */
  overflow: hidden;
}

.hero-fig picture {
  position: absolute;
  object-fit: cover;
  height: 100%;
}

.hero-fig picture img {
  height: 100%;
  width: auto;
  max-width: none;
  opacity: 0.7;
  margin: 0px;
}

@media screen and (min-width: 600px) {
  .hero-fig picture img {
    height: auto;
  }
}


.hero-figcaption {
  color: var(--color-white);
  /** above img */
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
  max-width: 100%;
}

.title {
  /*
    fluid typography calc see https://css-tricks.com/snippets/css/fluid-typography/
    calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
  */
  font-size: calc(21px + (48 - 18) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: 0.1rem;
  width: 800px;
  max-width: 100%;
  margin: 18vw auto auto auto;
}

@media screen and (min-width: 600px) {
  .title {
    margin: 2vw auto auto auto;
  }
}

.subtitle {
  font-size: calc(18px + (32 - 16) * ((100vw - 300px) / (1600 - 300)));
  margin-top: 0;
}

.address {
  font-size: calc(14px + (18 - 12) * ((100vw - 300px) / (1600 - 300)));
  margin-top: 0;
}

.map-form {
  align-self: center;
}

.map-button {
  /* icon from https://iconmonstr.com/location-24-svg/ */
  color: var(--color-black);
  background-color: var(--color-bluegreen);
  border: none;
  padding: 14px;
  cursor: pointer;
  font-weight: bold;
  font-size: calc(16px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
  margin-top: 20px;
}

.map-button > svg {
  vertical-align: middle;
}
.map-button > svg > path {
  fill: var(--color-black);
}
</style>
