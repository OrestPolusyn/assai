<template>
  <div class="v-contact-page v-contact-page--thanks">
    <b-container>
      <div class="v-contact">
        <b-title class-level="1" level="1" class="v-contact__thanks">
          Thank you
          <span>for getting in touch!</span>
        </b-title>
        <p class="v-contact__thanks-text">
          One of our team will come back to you as soon as possible.
        </p>
        <p class="v-contact__thanks-text">
          In the meantime, please check out our <a href="#">FAQs</a>
        </p>
      </div>
    </b-container>
    <figure class="v-contact__thanks-img">
      <img src="img/letter-send.svg" alt="" />
    </figure>
  </div>
</template>

<script>
import BTitle from "../components/base/content/b-title";
import BContainer from "../components/base/grid/b-container";

import { mapState } from "vuex";

export default {
  name: "contact",
  components: { BContainer, BTitle },
  async middleware({ store }) {
    await store.dispatch("pages/loadPageData", { pageSlug: "contact" });
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/contact/index";
</style>
