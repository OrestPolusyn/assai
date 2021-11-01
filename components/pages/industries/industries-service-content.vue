<template>
  <div class="c-industries-item --service-content">
    <div class="c-industries-item__icon" :class="`--${title.toLowerCase()}`">
      <img :src="icon" :alt="title">
    </div>
    <div class="c-industries-item__content">
      <b-title class-level="4" level="2">
        {{ title }}
      </b-title>
      <div class="c-industries-item__text" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import BTitle from "../../base/content/b-title";
export default {
  name: "industries-service-content",
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
    content: {
      type: String,
      default: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
        'A sneak preview of our new logo!'
    },
  },
}
</script>
