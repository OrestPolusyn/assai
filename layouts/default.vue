<template>
  <div class="v-layout v-layout-default">
    <m-navigation/>
    <main class="v-main-content">
      <Nuxt/>
    </main>
    <m-footer/>
  </div>
</template>

<script>
import MNavigation from "../components/main/m-navigation";
import MFooter from "../components/main/m-footer";
export default {
  name: "default",
  components: {MFooter, MNavigation}
}
</script>
