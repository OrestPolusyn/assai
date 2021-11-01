<template>
  <header class="b-page-header-sect">
    <div class="b-page-header__images">
      <img :src="backgroundImage" alt="Background image">
    </div>
    <b-container class="--page-header">
      <div class="b-page-header">
        <div class="b-page-header__wrap b-page-header__wrap_left" :class="{ [`${leftWrapClass}`]: !!leftWrapClass }">
          <slot name="left"></slot>
        </div>
        <div class="b-page-header__wrap b-page-header__wrap_right" :class="{ [`${rightWrapClass}`]: !!rightWrapClass }">
          <slot name="right"></slot>
        </div>
      </div>
    </b-container>
  </header>
</template>

<script>
import BContainer from "../grid/b-container";
export default {
  name: "b-page-header",
  components: {BContainer},
  props: {
    backgroundImage: {
      type: String,
      default: '/img/industries-header.jpg'
    },
    leftWrapClass: {
      type: String,
    },
    rightWrapClass: {
      type: String,
    },
  },
}
</script>
