<template>
  <div class="v-front-page">
    <ps-header v-if="content.screen1 && content.screen1.sliders"
               :solutions-list="content.navigation.solutions"
               :main-slider="content.screen1.sliders"/>
    <ps-clients v-if="content.screen2 && content.screen2.clients"
                :title="content.screen2.clients_title"
                :slides="content.screen2.clients"/>
    <ps-works v-if="content.screen2 && content.screen2.sliders"
              :title="content.screen2.sliders_title"
              :slides="content.screen2.sliders"/>
    <ps-about v-if="content.screen3"
              :video-poster="content.screen3.mediaPoster"
              :title="content.screen3.title"
              :content="content.screen3.text"
              :video="content.screen3.media"/>
    <ps-blog v-if="blogPosts.length > 0" :posts="blogPosts"
             :cta-text="content.blog.ctaTitle" :title="content.blog.title"/>
    <bc-customers-say :reviews="content.feedback"/>
  </div>
</template>

<script>
import PsHeader from "../components/pages/home/ps-header";
import PsClients from "../components/pages/home/ps-clients";
import PsWorks from "../components/pages/home/ps-works";
import PsAbout from "../components/pages/home/ps-about";
import PsBlog from "../components/pages/home/ps-blog";
import { mapState } from 'vuex';
import objectValue from "../utils/objectValue";
import BcCustomersSay from "../components/base/content/bc-customers-say";

export default {
  components: {BcCustomersSay, PsBlog, PsAbout, PsWorks, PsClients, PsHeader},
  async middleware({store: { dispatch } }) {
    await dispatch('pages/loadPageData', { pageSlug: 'home' });
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.pages[locale], 'home', {});
      }
    }),
    blogPosts() {
      return this.content.blog?.articles ? this.content.blog.articles : [];
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/home/index";
</style>
