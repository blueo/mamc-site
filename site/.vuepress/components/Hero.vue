<template>
  <section class="container">
    <h1 v-if="text" class="title" v-html="text" />
    <h2 v-if="subtitle" class="subtitle" v-html="subtitle" />
    <h3 v-if="address" class="address" v-html="address" />
    <form action="https://goo.gl/maps/tyzoLaZBJoVQHV9Y6" target="_blank" rel="noopener">
      <button class="map-button" type="submit">
        Directions
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
      </button>
    </form>
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
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
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
    margin: 12vw auto auto auto;
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

.map-button {
  /* icon from https://iconmonstr.com/location-24-svg/ */
  color: var(--color-white);
  background-color: var(--color-black);
  border: none;
  border-radius: 8px;
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
  fill: var(--color-white);
}
</style>
