<template>
  <b-content-card-wrap class="--image-card">
    <div class="cb-image-card">
      <figure class="cb-image-card__title">
        <img class="--clip-path-image" :src="img" :alt="content.title">
      </figure>
      <div class="cb-image-card__content">
        <div class="cb-image-card__date">
          {{ date }}
        </div>
        <p class="cb-image-card__text" v-html="content"></p>
        <nuxt-link :to="localePathHelper('/blog/' + slug)" class="cb-image-card__link">
          {{ $t('buttons.readMore') }}
        </nuxt-link>
      </div>
    </div>
  </b-content-card-wrap>
</template>

<script>
import BContentCardWrap from "../wrappers/b-content-card-wrap";
export default {
  name: "b-image-card",
  components: {BContentCardWrap},
  props: {
    img: {
      type: String,
      default: '/img/slider-image.jpg'
    },
    date: {
      type: String,
      default: '24 July 2021'
    },
    content: {
      type: String,
      default: 'A sneak preview of our new logo!'
    },
    slug: {
      type: String,
      default: 'default-slug'
    }
  },
}
</script>
