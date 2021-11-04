<template>
  <div class="v-about-page">
    <b-container>
      <div class="v-about">
        <b-title class-level="1" level="1">
          We are Smart, optimistic, Collaborative & Reassuring
        </b-title>
      </div>
    </b-container>
  </div>
</template>

<script>
import BTitle from "../components/base/content/b-title";
import BContainer from "../components/base/grid/b-container";

export default {
  name: "company",
  components: { BContainer, BTitle },
  async middleware({ store }) {
    await store.dispatch("pages/loadPageData", { pageSlug: "company" });
  },
};
</script>


<style lang="scss">
@import "~/assets/scss/base/pages/about/index";
</style>