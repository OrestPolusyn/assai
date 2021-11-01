<template>
  <div class="v-article-page">

    <section class="v-article-content-sect">
      <b-container class="--article-content">
        <div class="v-article__head">
          <b-title level="1" class-level="2">
            {{ content.title }}
          </b-title>
          <p class="v-article__head-date">
            {{ content.date }}
          </p>
        </div>
        <div class="v-article-content --text-formatting" v-html="content.text"></div>
        <h3 v-if="content.author.name && content.author.position" class="v-article-author">
          By {{ content.author.name }}, {{ content.author.position }}
        </h3>
        <div class="v-article-share">
          <div class="v-article-share__text">
            Share
          </div>
          <share-network network="facebook"
                         class="share-network"
                         :url="`https://assai-frontend.herokuapp.com/${$route.fullPath}`"
                         :title="content.title">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.25081 11.8057V11.3057H2.75081H0.940103C0.712607 11.3057 0.5 11.1092 0.5 10.8356V7.74002C0.5 7.46624 0.712556 7.26987 0.940103 7.26987H2.75081H3.25081V6.76987V5.21973C3.25081 3.7842 3.68612 2.6081 4.46667 1.7816L4.46668 1.78159C5.24818 0.954038 6.35152 0.500091 7.69416 0.5C7.69429 0.5 7.69442 0.5 7.69456 0.5L10.0606 0.503967C10.0607 0.503967 10.0607 0.503967 10.0607 0.503967C10.2877 0.504395 10.5 0.700961 10.5 0.974121V3.84827C10.5 4.1222 10.2874 4.31842 10.0602 4.31842H10.06L8.46654 4.31903C8.46648 4.31903 8.46642 4.31903 8.46635 4.31903C7.94739 4.31906 7.62707 4.41958 7.45096 4.62467L7.44995 4.62585C7.3475 4.74591 7.30122 4.89218 7.27584 5.01947C7.24865 5.1558 7.23478 5.32734 7.23478 5.54504V6.76971V7.26971H7.73478H9.94042C10.0222 7.26971 10.0965 7.29062 10.156 7.32487C10.2954 7.40535 10.3892 7.56298 10.3893 7.73998C10.3893 7.74 10.3893 7.74002 10.3893 7.74003C10.3893 7.74008 10.3893 7.74013 10.3893 7.74017L10.3881 10.8355V10.8357C10.3881 11.1091 10.1756 11.3056 9.94797 11.3056H7.73478H7.23478V11.8056V19.0298C7.23478 19.3035 7.02217 19.5 6.79453 19.5H3.69092C3.46337 19.5 3.25081 19.3036 3.25081 19.0298V11.8057Z" stroke="#0080FF"/>
            </svg>
          </share-network>
          <share-network network="twitter"
                         class="share-network"
                         :url="`https://assai-frontend.herokuapp.com/${$route.fullPath}`"
                         :title="content.title">
            <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.8682 2.23952C22.7511 2.12242 22.5559 2.08337 22.3997 2.12242L21.6189 2.39571C22.0874 1.84918 22.3997 1.26359 22.5949 0.717061C22.673 0.521867 22.634 0.365721 22.5168 0.248577C22.3997 0.131479 22.2045 0.0924313 22.0483 0.170482C20.9553 0.638965 20.0183 1.02935 19.2376 1.26355C19.2376 1.3026 19.1985 1.26355 19.1595 1.26355C18.5348 0.91221 17.0123 0.131434 15.9193 0.131434C13.1475 0.170482 10.9223 2.51281 10.9223 5.36262V5.51877C6.86229 4.73799 4.63711 3.56683 2.21668 1.02931L1.82639 0.63892L1.59214 1.1074C0.264835 3.64492 1.20176 5.9482 2.72426 7.50976C2.02158 7.39266 1.5531 7.15842 1.12366 6.80708C0.967515 6.68998 0.772321 6.65093 0.577127 6.76803C0.420981 6.84612 0.342885 7.08032 0.381933 7.27551C0.928467 9.11031 2.29482 10.5938 3.77828 11.4917C3.0756 11.4917 2.49002 11.4136 1.90444 11.0232C1.74829 10.9451 1.51405 10.9451 1.3579 11.0622C1.20176 11.1794 1.12366 11.3745 1.20176 11.5697C1.90444 13.5607 3.27079 14.6147 5.45698 14.888C4.32486 15.5517 2.8414 16.0982 0.538124 16.1373C0.303883 16.1373 0.108689 16.2934 0.0306381 16.4886C-0.0474574 16.7229 0.0306381 16.9181 0.186784 17.0742C1.59219 18.2063 4.71525 18.87 8.58008 18.87C15.4509 18.87 21.0724 12.7409 21.0724 5.20648V5.08938C21.9313 4.65994 22.634 3.84012 22.9853 2.708C23.0243 2.55181 22.9853 2.35662 22.8682 2.23952ZM20.5259 4.4647L20.2916 4.5428V5.20648C20.2916 12.3115 15.0214 18.0892 8.58003 18.0892C5.02749 18.0892 2.64616 17.5036 1.3579 16.879C4.05157 16.6838 5.61312 15.825 6.82333 14.888L7.7993 14.1854H6.62814C4.40296 14.1854 3.0366 13.5607 2.25582 12.0773C2.9585 12.3115 3.70023 12.3115 4.52005 12.2725C4.83235 12.2334 5.14468 12.2334 5.45698 12.2334L5.57407 11.4526C4.09062 11.0232 2.33387 9.69589 1.475 7.90014C2.25578 8.25148 3.1146 8.32958 3.89538 8.32958H5.10559L4.12967 7.62685C3.30984 7.04127 0.889464 4.97223 2.06063 2.00528C4.5591 4.4647 6.94048 5.59682 11.2347 6.37759L11.7032 6.45569V5.36262C11.7032 2.94224 13.577 0.951257 15.9194 0.91221C16.8172 0.873162 18.3007 1.69299 18.7301 1.92723C18.9644 2.04433 19.1986 2.08337 19.4328 2.00532C20.0184 1.81013 20.7211 1.53684 21.5018 1.22455C21.1505 1.81013 20.682 2.35666 20.0574 2.86419C19.9013 2.98129 19.8622 3.21553 19.9403 3.41073C20.0184 3.60592 20.2526 3.68402 20.4478 3.60592L21.9703 3.09844C21.697 3.60588 21.2676 4.19146 20.5259 4.4647Z" fill="#0080FF"/>
            </svg>
          </share-network>
        </div>
      </b-container>
    </section>

    <ps-blog :has-beautify="false" title="Another articles" :posts="content.otherArticles"/>
  </div>
</template>

<script>
import BPageHeader from "../../../components/base/ui-elements/b-page-header";
import BTitle from "../../../components/base/content/b-title";
import PsBlog from "../../../components/pages/home/ps-blog";
import BContainer from "../../../components/base/grid/b-container";
import {mapState} from "vuex";
import objectValue from "../../../utils/objectValue";
export default {
  name: "index",
  components: {BContainer, PsBlog, BTitle, BPageHeader},
  async middleware({ store: { dispatch }, route: { params } }) {
    await dispatch('pages/loadPageData', { pageSlug: params.slug, mainPage: 'article' });
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        const slug = this.$route.params.slug;
        return objectValue(state.pages.article[locale], slug, {});
      }
    }),
    hasAuthor() {
      return Object.values(this.content.author).filter(el => el).length > 0;
    },
    hasImage() {
      return !!this.content.image;
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/article/index";
</style>
