<template>
  <div class="v-industries-service-page" :class="`--${$route.params.slug}`">
    <b-page-header class="--ind-service-head" :background-image="content.background">
      <template #left>
        <b-title class-level="1" level="1">
          {{ content.title }}
        </b-title>
      </template>
      <template #right>
        <div class="v-industries-service-head">
          <b-title class-level="4" level="2">
            {{ content.subtitle }}
          </b-title>
          <div class="v-industries-service-head__text">
            {{ content.description }}
          </div>
        </div>
      </template>
    </b-page-header>
    <section class="v-industries-service-content-sect" v-if="content.features && content.features.length > 0">
      <b-container>
        <b-title class="v-industries-service-content__title" level="2" class-level="2">Product Features</b-title>
        <div class="v-industries-service-content">
          <industries-service-content v-for="feature in content.features"
                                      :key="feature.title"
                                      :icon="feature.media"
                                      :title="feature.title"
                                      :content="feature.description"/>
        </div>
      </b-container>
    </section>
    <template v-if="content.sections && content.sections.length > 0">
      <section class="v-industries-service-example-sect">
        <b-container>
          <div class="v-industries-service-example"
               v-for="(sect, index) in content.sections"
               :class="{ '--slider': isSectionSlider, '--active': currentSectionSlide === index }"
               :key="sect.title">
            <template v-if="(index + 1) % 2">
              <figure class="v-industries-service-example__wrap v-industries-service-example__wrap_right">
                <img :src="sect.media" :alt="sect.title">
              </figure>
              <div class="v-industries-service-example__wrap v-industries-service-example__wrap_left">
                <b-title class-level="2" level="2" v-html="sect.title"></b-title>
                <div class="v-industries-service-example__text" v-html="sect.text"></div>
                <a v-if="!!sect.ctaTitle" :href="sect.ctaLink" class="b-button --white --primary-hover">
                  <span>{{ sect.ctaTitle }}</span>
                </a>
              </div>
            </template>
            <template v-else>
              <div class="v-industries-service-example__wrap v-industries-service-example__wrap_left">
                <b-title class-level="2" level="2" v-html="sect.title"></b-title>
                <div class="v-industries-service-example__text" v-html="sect.text"></div>
                <a v-if="!!sect.ctaTitle" :href="sect.ctaLink" class="b-button --white --primary-hover">
                  <span>{{ sect.ctaTitle }}</span>
                </a>
              </div>
              <figure class="v-industries-service-example__wrap v-industries-service-example__wrap_right">
                <img :src="sect.media" :alt="sect.title">
              </figure>
            </template>
          </div>
          <div class="v-industries-service-example__controls" v-if="isSectionSlider">
            <div class="ch-header-slider__controls">
              <div class="ps-works__controls-wrapper">
                <div class="ch-header-slider__controls-view">
            <span v-for="(_, index) in Array(content.sections.length)"
                  :class="{ active: index === currentSectionSlide }"
                  :key="index"></span>
                </div>
                <div class="ch-header-slider__counter">
                  {{ currentSectionSlide + 1 }} / {{ content.sections.length }}
                </div>
              </div>
              <div class="ps-works__buttons">
                <button @click="prevSectSlide" class="ps-front-clients__arrow --left">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 26L26 0L-3.43595e-09 13.0765L26 26Z" fill="#0080FF"/>
                  </svg>
                </button>
                <button @click="nextSectSlide" class="ps-front-clients__arrow --right">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.27982e-06 -2.27299e-06L0 26L26 12.9235L2.27982e-06 -2.27299e-06Z" fill="#0080FF"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </b-container>
      </section>
    </template>
    <section class="v-industries-services-all-sect --beautify-block"
             v-if="content.otherSubpages && content.otherSubpages.length > 0">
      <b-container>
        <b-title class="v-industries-services-all__title" class-level="2" level="2">
          Other solutions
        </b-title>
        <div class="v-industries-services-all">
          <industries-item v-for="(feature, index) in activeSlides"
                           :icon="feature.icon"
                           :title="feature.title"
                           :content="feature.description"
                           :link-slug="feature.slug"
                           :key="feature.title + feature.slug + index"/>
        </div>
        <div class="v-industries-services-all__btns">
          <button @click="prevSlide" class="ps-front-clients__arrow --left">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 26L26 0L-3.43595e-09 13.0765L26 26Z" fill="#0080FF"/>
            </svg>
          </button>
          <button @click="nextSlide" class="ps-front-clients__arrow --right">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.27982e-06 -2.27299e-06L0 26L26 12.9235L2.27982e-06 -2.27299e-06Z" fill="#0080FF"/>
            </svg>
          </button>
        </div>
      </b-container>
    </section>
    <ps-blog :has-beautify="false" v-if="blogPosts.length > 0" :posts="blogPosts"
             :cta-text="content.blog.ctaTitle" :title="content.blog.title"/>
  </div>
</template>

<script>
import BContainer from "../../../components/base/grid/b-container";
import BPageHeader from "../../../components/base/ui-elements/b-page-header";
import BTitle from "../../../components/base/content/b-title";
import IndustriesServiceContent from "../../../components/pages/industries/industries-service-content";
import BButtonLink from "../../../components/base/links/b-button-link";
import PsBlog from "../../../components/pages/home/ps-blog";
import IndustriesItem from "../../../components/pages/industries/industries-item";
import {mapState} from "vuex";
import objectValue from "../../../utils/objectValue";
export default {
  name: "index",
  components: {IndustriesItem, PsBlog, BButtonLink, IndustriesServiceContent, BTitle, BPageHeader, BContainer},
  async middleware({store: { dispatch }, route: { params } }) {
    await dispatch('pages/loadPageData', { pageSlug: params.slug, mainPage: params.page });
  },
  data() {
    return {
      offset: 0,
      perPage: 3,
      currentSectionSlide: 0,
      exampleBlock: {
        title: 'All about planning<br>and progress control',
        textContent: 'Assai is the global in Document Management Solutions for complex engineering and construction projects with a unique focus on pro-actively ‘controlling’ the document revision',
        buttonText: 'Contact Us',
        linkPath: '/',
        image: '/img/front/how-it-works-ill.jpg'
      },
      industriesAll: [
        {
          icon: '/img/ind-icons/energy-ind.svg',
          title: 'Energy',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
        {
          icon: '/img/ind-icons/construction-ind.svg',
          title: 'Construction ',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
        {
          icon: '/img/ind-icons/mining-ind.svg',
          title: 'Mining ',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
        {
          icon: '/img/ind-icons/transport-ind.svg',
          title: 'Transport ',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
        {
          icon: '/img/ind-icons/grid-operators-ind.svg',
          title: 'Grid operators ',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
        {
          icon: '/img/ind-icons/epc-ind.svg',
          title: 'EPC',
          content: 'A sneak preview of our new logo!A sneak preview of our new logo!A sneak preview of our new logo!\n' +
            'A sneak preview of our new logo!'
        },
      ]
    }
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        const slug = this.$route.params.slug;
        const pageSlug = this.$route.params.page;
        const stateField = state.pages[pageSlug] ? state.pages[pageSlug][locale] : state.pages.pages[locale];
        return objectValue(stateField, slug, {});
      }
    }),
    blogPosts() {
      return this.content.blog?.articles ? this.content.blog.articles : [];
    },
    slidesCondition() {
      return this.slides.length > this.perPage;
    },
    activeSlides() {
      const slides = [...this.content.otherSubpages].splice(this.offset, this.perPage);

      if (slides.length === this.perPage) {
        return slides;
      }

      // return [
      //   ...slides,
      //   ...[...this.content.otherSubpages].splice(0, this.perPage - slides.length),
      // ];
      return [
        ...slides,
      ];
    },
    isSectionSlider() {
      return this.content.sectionsDirection === 'vertical';
    },
  },
  methods: {
    nextSlide() {
      let offset = this.offset + 1;

      if (offset >= this.industriesAll.length) {
        offset = 0;
      }

      this.offset = offset;
    },
    prevSlide() {
      let offset = this.offset - 1;

      if (offset < 0) {
        offset = this.industriesAll.length - 1;
      }

      this.offset = offset;
    },
    nextSectSlide() {
      if(this.currentSectionSlide === this.content.sections.length - 1) {
        this.currentSectionSlide = 0;
        return;
      }

      this.currentSectionSlide += 1;
    },
    prevSectSlide() {
      if(this.currentSectionSlide === 0) {
        this.currentSectionSlide = this.content.sections.length - 1;
        return;
      }

      this.currentSectionSlide -= 1;
    },
  },
  created() {
    if(this.$device.isMobile) {
      this.perPage = 1;
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/_industries";
</style>
