<template>
  <section class="bp-blog-posts-sect">
    <b-container>
      <div class="bp-blog-posts">
        <div class="bp-blog-posts__wrap bp-blog-posts__wrap_top">
            <b-dropdown-buttons :placeholder="sortMethod || 'Sort by'"
                                :nested-items="sortMethods"
                                @input="sortArticles"
                                class="--blog-posts-sort"/>
        </div>
        <div class="bp-blog-posts__wrap bp-blog-posts__wrap_bot">
          <b-image-card v-for="blogPost in articles.data" :img="blogPost.image"
                        :slug="blogPost.slug"
                        :date="blogPost.date"
                        :content="blogPost.title"
                        :key="blogPost.title + blogPost.date"/>
        </div>
        <observer @intersect="loadPaginationArticles"/>
      </div>
    </b-container>
  </section>
</template>

<script>
import BContainer from "../../base/grid/b-container";
import BDropdownButtons from "../../base/ui-elements/b-dropdown-buttons";
import BImageCard from "../../base/ui-elements/cards/b-image-card";
import {mapState} from "vuex";
import objectValue from "../../../utils/objectValue";
import Observer from "../../base/observer";
export default {
  name: "pb-blog-posts",
  components: {Observer, BImageCard, BDropdownButtons, BContainer},
  data() {
    return {
      sortMethod: null,
      currentPage: 1,
      sortMethods: [
        {
          placeholder: 'Newest',
          value: 'date'
        },
        {
          placeholder: 'Oldest',
          value: '-date'
        },
      ]
    }
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.pages[locale], 'blog', {});
      },
      articles(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.articles, locale, {});
      }
    }),
    pagesCount() {
      return this.articles?.meta?.last_page ? this.articles.meta.last_page : 1;
    },
  },
  methods: {
    sortArticles(value) {
      this.sortMethod = value;
      this.$store.dispatch('pages/loadSortedElements', {
        sort: value,
        queryType: 'Articles',
        commitElementKey: 'articles'
      });
    },
    loadPaginationArticles() {
      const currentPage = this.currentPage;
      const newPage = currentPage + 1;

      if(newPage > this.pagesCount) return;

      this.$store.dispatch('pages/loadPaginationElements', {
        sort: this.sortMethod,
        page: newPage,
        queryType: 'Articles',
        commitElementKey: 'articles'
      });
    }
  },
}
</script>
