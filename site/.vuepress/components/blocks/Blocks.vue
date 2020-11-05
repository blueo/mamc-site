<template>
  <section>
    <component
      v-for="block in blockChildren"
      :is="block.component"
      v-bind="block.defs"
    />
  </section>
</template>

<script>
import blockMap from "./block-map";

export default {
  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    blockChildren: (v) => {
      // loop through blocks and match template to components
      return v.blocks.map(({ template, ...defs }) => {
        return {
          component: template,
          defs,
        };
      });
    },
  },
  components: blockMap,
};
</script>
