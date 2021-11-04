<template>
  <nuxt-link :to="`/${pageType}/${linkSlug}`" class="c-industries-item">
    <div class="c-industries-item__icon" :class="`--${title.toLowerCase()}`">
      <img :src="icon" :alt="title">
    </div>
    <div class="c-industries-item__content">
      <b-title class-level="4" level="2">
        {{ title }}
      </b-title>
      <div class="c-industries-item__text">
        {{ cropContent }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import BTitle from "../../base/content/b-title";
export default {
  name: "industries-item",
  components: {BTitle},
  props: {
    icon: {
      type: String,
      default: '/img/ind-icons/energy-ind.svg'
    },
    title: {
      type: String,
      default: 'Energy'
    },
    pageType: {
      type: String,
      default: 'solutions'
    },
    content: {
      type: String,
      default: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
        'A sneak preview of our new logo!'
    },
    linkSlug: {
      type: String,
      default: 'slug'
    }
  },
  computed: {
    cropContent() {
      return !this.$device.isDesktop ? this.content.slice(0, 150) + '...' : this.content;
    }
  },
}
</script>
