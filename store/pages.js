import { getField, updateField } from 'vuex-map-fields';
import httpConfig from '~/http.config';
import casheState from "@/utils/casheState";

const _STATE_ = Object.freeze({
  pages: {
    en: {},
    ru: {},
    zh: {},
  },
  industries: {
    en: {},
    ru: {},
    zh: {},
  },
  solutions: {
    en: {},
    ru: {},
    zh: {},
  },
  // Для страницы с блогпостами
  articles: {
    en: {},
    ru: {},
    zh: {},
  },
  // Для страницы с отдельным постом
  article: {
    en: {},
    ru: {},
    zh: {},
  },
  navigation: {
    en: {},
    ru: {},
    zh: {},
  },
  vacancies: {
    en: {},
    ru: {},
    zh: {},
  },
  vacancy: {
    en: {},
    ru: {},
    zh: {},
  },
});

export default {
  state: () => ({..._STATE_}),
  getters: {
    getField,
  },
  mutations: {
    updateField,
    updateVacancyArray(state, { data = [], locale, elementKey }) {
      state[elementKey][locale].data.push(...data);
    },
    clean(state) {
      state = Object.assign(state, _STATE_);
    }
  },
  actions: {
    async loadPageData({ commit, getters }, { pageSlug, mainPage = 'pages' }) {
      const mainStorePage = getters.getField(mainPage);
      const mainPageChecker = mainStorePage ? mainPage : 'pages';
      const locale = this.$i18n.locale;
      const canMakeQuery = casheState({
        slug: pageSlug,
        getters,
        stateField: mainPageChecker,
        locale
      });

      let queryFunc = null;

      switch (mainPage) {
        case "pages":
          queryFunc = 'getPageData';
          break;
        case "article":
          queryFunc = 'getArticle';
          break;
        case "vacancy":
          queryFunc = 'getVacancy';
          break;
        default:
          queryFunc = 'getSubpageData';
          break;
      }

      const queryLink = httpConfig[queryFunc](pageSlug, mainPage);

      if(canMakeQuery && queryLink) {
        const query = await this.$http.get(queryLink);
        commit('updateField', { path: `${mainPageChecker}.${locale}.${pageSlug}`, value: query.body });
      }
    },
    async getNavigation({ commit }) {
      const queryLink = httpConfig.getNavigation();
      const locale = this.$i18n.locale;

      const query = await this.$http.get(queryLink);
      delete query.body.queryDate

      commit('updateField', { path: `navigation.${locale}`, value: query.body });
    },
    async loadVacancies({ commit }) {
      const queryLink = httpConfig.loadVacancies({});
      const locale = this.$i18n.locale;

      const query = await this.$http.get(queryLink);
      commit('updateField', { path: `vacancies.${locale}`, value: query.body });
    },
    async loadArticles({ commit }) {
      const queryLink = httpConfig.loadArticles({});
      const locale = this.$i18n.locale;

      const query = await this.$http.get(queryLink);
      commit('updateField', { path: `articles.${locale}`, value: query.body });
    },
    async loadPaginationElements({ commit }, { page = null, sort = null, queryType, commitElementKey }) {
      if(!queryType || !commitElementKey) return;

      const queryLink = httpConfig[`load${queryType}`]({ page, sort });
      const locale = this.$i18n.locale;

      const query = await this.$http.get(queryLink);

      commit('updateElementsArray', { locale, data: query.body.data, elementKey: commitElementKey });
    },
    async loadSortedElements({ commit }, { sort = null, queryType, commitElementKey }) {
      if(!queryType || !commitElementKey) return;

      const queryLink = httpConfig[`load${queryType}`]({ sort });
      const locale = this.$i18n.locale;

      const query = await this.$http.get(queryLink);

      commit('updateField', { path: `${commitElementKey}.${locale}`, value: query.body });
    }
  }
};
