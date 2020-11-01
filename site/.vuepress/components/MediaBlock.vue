<template>
    <section class="media-block">
        <div>content</div>
        <figure>
            <img src="" alt="">
        </figure>
    </section>
</template>

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
    flex: 1 1 0px;
  }
}

</style>