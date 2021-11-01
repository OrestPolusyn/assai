<template>
  <nuxt-link :to="localePathHelper(to)" class="b-button">
    <span>
      <slot></slot>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  name: "b-button-link",
  props: {
    to: {
      type: String,
      default: '/'
    },
  },
}
</script>
