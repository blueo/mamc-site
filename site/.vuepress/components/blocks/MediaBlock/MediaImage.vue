<template>
  <figure class="fig">
    <picture
      ><img
        v-bind:alt="imageDescription"
        v-bind:src="imageSrc"
        v-bind:srcset="imageSrcSet"
        sizes="(min-width: 1000px) min(50vw, 750px), 100vw, "
        loading="lazy"
      />
    </picture>
  </figure>
</template>
<script>
export default {
  props: {
    imageDescription: {
      type: String,
    },
    imageSrc: {
      type: String,
    },
    imageSrcSet: {
      type: String,
    },
  },
};
</script>
<style lang="stylus" scoped>
.fig {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 100vw;
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

@media screen and (min-width: $breakpoint-large) {
  .fig {
    min-height: Min(690px, 50vw);
  }

  .fig picture {
    height: Min(690px, 50vw);
  }
}
</style>