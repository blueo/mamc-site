<script lang="ts">
	export let imageDescription: string;
	export let imageSrc: string;
	export let imageSrcSet: string;
	export let imageOrientation: string;

	function imageClasses() {
		if (imageOrientation === 'landscape') {
			return 'fig landscape';
		}

		return 'fig';
	}
</script>

<figure class={imageClasses()}>
	<picture
		><img
			alt={imageDescription}
			src={imageSrc}
			srcset={imageSrcSet}
			sizes="(min-width: 1000px) min(50vw, 750px), 100vw, "
			loading="lazy"
		/>
	</picture>
</figure>

<style lang="stylus" scoped>
  @import "../../../global.styl";
.fig {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 100vw;
}

.fig.landscape {
  min-height: calc(100vw * 0.5625);
}

.fig picture {
  position: absolute;
  object-fit: cover;
  height: 100%;
}

.fig.landscape picture {
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.fig picture img {
  height: 100%;
  width: auto;
  max-width: none;
  margin: 0px;
}

.fig.landscape picture img {
  height: auto;
}

@media screen and (min-width: $breakpoint-large) {
  .fig {
    min-height: Min(690px, 50vw);
  }

  .fig.landscape {
    min-height: Min(388px, calc(50vw * 0.5625));
  }

  .fig picture {
    height: Min(690px, 50vw);
  }

  .fig.landscape picture {
    min-height: Min(388px, calc(50vw * 0.5625));
  }
}
</style>
