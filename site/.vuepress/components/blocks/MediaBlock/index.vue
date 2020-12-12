<template>
  <div class="row-dark">
    <div class="container">
      <section class="media-block">
        <MediaContent
          v-if="imageRight"
          :title="title"
          :content="content"
          :callToAction="call_to_action"
        />
        <MediaImage
          v-else
          :imageDescription="image_description"
          :imageSrc="imageSrc"
          :imageSrcSet="imageSrcSet"
        />
        <MediaImage
          v-if="imageRight"
          :imageDescription="image_description"
          :imageSrc="imageSrc"
          :imageSrcSet="imageSrcSet"
        />
        <MediaContent
          v-else
          :title="title"
          :content="content"
          :callToAction="call_to_action"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { getFrontMatterField } from "../../../utils/defaultFields";
import MediaImage from "./MediaImage";
import MediaContent from "./MediaContent";

export default {
  components: {
    MediaImage,
    MediaContent,
  },
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
  methods: {
    getMediaProp: getFrontMatterField("media-block"),
  },
  computed: {
    imageRight() {
      return this.getMediaProp("image_right");
    },
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

@media screen and (min-width: $breakpoint-large) {
  .media-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>