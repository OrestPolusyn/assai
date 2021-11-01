<template>
  <div class="v-careers-page">
    <b-page-header left-wrap-class="--careers-header-left"
                   :background-image="content.screen1.background"
                   right-wrap-class="--careers-header-right">
      <template #left>
        <b-title class-level="1" level="1">
          Careers
        </b-title>
      </template>
      <template #right>
        <p class="--careers-header-text">
          {{ content.screen1.description }}
        </p>
      </template>
    </b-page-header>
    <section class="v-careers-sect">
      <b-container>
        <div class="v-careers">
          <div class="v-careers__wrap v-careers__wrap_top">
<!--            <b-dropdown-buttons placeholder="Filter by" :nested-items="sortMethods" class="&#45;&#45;blog-posts-filters"/>-->
            <b-dropdown-buttons :placeholder="sortMethod || 'Sort by'"
                                :nested-items="sortMethods"
                                @input="sortVacancies"
                                class="--blog-posts-sort"/>
          </div>
          <div class="v-careers__wrap v-careers__wrap_bot">
            <b-text-card v-for="(item, index) in vacancies.data"
                         :title="item.name"
                         :subtitle="item.requirements | cropText"
                         :content="item.description | cropText"
                         :slug="item.slug"
                         :key="item.name + index + 1"/>
          </div>
          <observer @intersect="loadPaginationVacancies"/>
        </div>
      </b-container>
    </section>
    <bc-customers-say :reviews="content.feedback"/>
  </div>
</template>

<script>
import BPageHeader from "../../components/base/ui-elements/b-page-header";
import BTitle from "../../components/base/content/b-title";
import BContainer from "../../components/base/grid/b-container";
import BDropdownButtons from "../../components/base/ui-elements/b-dropdown-buttons";
import BTextCard from "../../components/base/ui-elements/cards/b-text-card";
import BcCustomersSay from "../../components/base/content/bc-customers-say";
import {mapState} from "vuex";
import objectValue from "../../utils/objectValue";
import Observer from "../../components/base/observer";
export default {
  name: "index",
  components: {Observer, BcCustomersSay, BTextCard, BDropdownButtons, BContainer, BTitle, BPageHeader},
  async middleware({ store }) {
    await store.dispatch('pages/loadPageData', { pageSlug: 'careers' })
    await store.dispatch('pages/loadVacancies');
  },
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
        return objectValue(state.pages.pages[locale], 'careers', {});
      },
      vacancies(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.vacancies, locale, {});
      }
    }),
    pagesCount() {
      return this.vacancies?.meta?.last_page ? this.vacancies.meta.last_page : 1;
    },
  },
  methods: {
    sortVacancies(value) {
      this.sortMethod = value;
      this.$store.dispatch('pages/loadSortedElements', {
        sort: value,
        queryType: 'Vacancies',
        commitElementKey: 'vacancies'
      });
    },
    loadPaginationVacancies() {
      const currentPage = this.currentPage;
      const newPage = currentPage + 1;

      if(newPage > this.pagesCount) return;

      this.$store.dispatch('pages/loadPaginationElements', {
        sort: this.sortMethod,
        page: newPage,
        queryType: 'Vacancies',
        commitElementKey: 'vacancies'
      });
    }
  },
  filters: {
    cropText(value) {
      if(value && value.length > 25) {
        return value.slice(0, 100) + '...';
      }

      return value;
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/careers/index";
</style>
