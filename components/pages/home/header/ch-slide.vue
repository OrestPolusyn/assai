<template>
  <div class="ch-slide" :style="`background-image: url(${image});`">
<!--    <figure class="ch-slide__image">-->
<!--      <img :src="image" alt="title">-->
<!--    </figure>-->
    <div class="ch-slide__wrap">
      <b-title class-level="1" level="1" class="ch-slide__title">
        {{ title }}
      </b-title>
      <p class="ch-slide__subtitle">
        {{ subtitle }}
      </p>
      <a :href="buttonLink" class="ch-slide__link b-button --white --primary-background">
        <span>{{ buttonText }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import BTitle from "../../../base/content/b-title";
export default {
  name: "ch-slide",
  components: {BTitle},
  props: {
    image: {
      type: String,
      default: '/img/front/header-image-0.jpg'
    },
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle'
    },
    buttonText: {
      type: String,
      default: 'Button text'
    },
    buttonLink: {
      type: String,
      default: '/'
    },
  },
}
</script>
