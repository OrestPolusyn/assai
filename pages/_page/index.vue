<template>
  <div class="v-industries-page">
    <b-page-header class="v-industries__header"
                   v-bind="{
                    ...(content.background && {
                       'backgroundImage': content.background
                    })
                   }"
                   left-wrap-class="--industries-header-left"
                   right-wrap-class="--industries-header-right">
      <template #left>
        <b-title class-level="1" level="1">
          {{ content.title }}
        </b-title>
      </template>
      <template #right>
        <p class="--industries-header-text">
          {{ content.description }}
        </p>
      </template>
    </b-page-header>
    <section class="v-industries-services-sect">
      <b-container>
        <div class="v-industries-services" v-if="content.subpages && content.subpages.length > 0">
          <industries-item v-for="feature in content.subpages"
                           :icon="feature.icon"
                           :page-type="feature.pageType"
                           :title="feature.title"
                           :content="feature.description"
                           :link-slug="feature.slug"
                           :key="feature.title"/>
        </div>
      </b-container>
      <ps-blog :has-beautify="false" v-if="blogPosts.length > 0" :posts="blogPosts"
               :cta-text="content.blog.ctaTitle" :title="content.blog.title"/>
      <bc-customers-say :hasBeautify="true" :reviews="content.feedback"/>
    </section>

  </div>
</template>

<script>
import BPageHeader from "../../components/base/ui-elements/b-page-header";
import BTitle from "../../components/base/content/b-title";
import BContainer from "../../components/base/grid/b-container";
import IndustriesItem from "../../components/pages/industries/industries-item";
import PsBlog from "../../components/pages/home/ps-blog";
import {mapState} from "vuex";
import objectValue from "../../utils/objectValue";
import BcCustomersSay from "../../components/base/content/bc-customers-say";
export default {
  name: "index",
  components: {BcCustomersSay, PsBlog, IndustriesItem, BContainer, BTitle, BPageHeader},
  async middleware({store: { dispatch }, route: { params: { page } } }) {
    await dispatch('pages/loadPageData', { pageSlug: page });
  },
  computed: {
    blogPosts() {
      return this.content.blog?.articles ? this.content.blog.articles : [];
    },
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        const pageSlug = this.$route.params.page;
        return objectValue(state.pages.pages[locale], pageSlug, {});
      }
    }),
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/_industries";
</style>
