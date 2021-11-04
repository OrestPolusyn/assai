export default Object.freeze({
  baseURL: 'https://api.nextpage.pp.ua/api',
  getQueryString({ page = null, sort = null }) {
    let queryString = '';
    if(sort) {
      queryString = '?sort=' + sort;
    }
    if(page) {
      queryString = '?page=' + page;

      if(sort) {
        queryString += '&sort=' + sort;
      }
    }

    return queryString;
  },
  getPageData(pageSlug) {
    return `${this.baseURL}/pages/${pageSlug}`
  },
  getSubpageData(itemSlug, mainPage) {
    return `${this.baseURL}/subpages/${itemSlug}`;
  },
  getArticle(slug) {
    return `${this.baseURL}/articles/${slug}`;
  },
  postContactForm() {
    return `${this.baseURL}/contact`;
  },
  getNavigation() {
    return `${this.baseURL}/navigation`;
  },
  getVacancy(slug) {
    return `${this.baseURL}/vacancies/${slug}`
  },
  loadVacancies({ page = null, sort = null }) {
    let queryString = this.getQueryString({ page, sort })

    return `${this.baseURL}/vacancies${queryString}`
  },
  loadArticles({ page = null, sort = null }) {
    let queryString = this.getQueryString({ page, sort })

    return `${this.baseURL}/articles${queryString}`
  }
});
