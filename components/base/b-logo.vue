<template>
  <nuxt-link :to="localePathHelper('/')" class="c-logo">
    <img :src="imagePath + 'logo.jpg'" alt="Assai logotype">
  </nuxt-link>
</template>

<script>
export default {
  name: "b-logo"
}
</script>
