<template>
  <div class="v-blog-page">
    <b-page-header left-wrap-class="--blog-header-left"
                   right-wrap-class="--blog-header-right">
      <template #left>
        <b-title class-level="1" level="1">
          Blog
        </b-title>
      </template>
      <template #right>
        <p class="--blog-header-text">
          AssaiDCMS specializes in supporting complex engineering and construction projects across industries such as Oil and Gas, Energy, Transportation, Mining, and Commercial and Community Infrastructure.
        </p>
      </template>
    </b-page-header>
    <pb-blog-posts/>
    <bc-customers-say/>
  </div>
</template>

<script>
import BPageHeader from "../../components/base/ui-elements/b-page-header";
import BTitle from "../../components/base/content/b-title";
import PbBlogPosts from "../../components/pages/blog/pb-blog-posts";
import BcCustomersSay from "../../components/base/content/bc-customers-say";
export default {
  name: "index",
  components: {BcCustomersSay, PbBlogPosts, BTitle, BPageHeader},
  async middleware({ store }) {
    await store.dispatch('pages/loadPageData', { pageSlug: 'blog' })
    await store.dispatch('pages/loadArticles');
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/blog/index";
</style>
