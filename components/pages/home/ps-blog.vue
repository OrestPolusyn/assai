<template>
  <section class="ps-blog-sect" :class="{ '--beautify-block': hasBeautify }">
    <b-container>
      <div class="ps-blog">
        <div class="ps-blog__wrap ps-blog__wrap_top">
          <b-title class-level="2" level="2" class="ps-blog__title">
            {{ title ? title : $t('home.blog_title') }}
          </b-title>
        </div>
      </div>
    </b-container>
    <div class="ps-blog__wrap ps-blog__wrap_bot">
      <div class="ps-blog__slider">
        <b-image-card v-for="(slide, index) in activeSlides"
                      :img="slide.image"
                      :slug="slide.slug"
                      :date="slide.date"
                      :content="slide.title"
                      :key="index + 1" />
      </div>
      <div class="ps-blog__controls">
        <div class="ps-front-clients__arrows">
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
        <b-button-link to="/contact" class="--border --primary-font-color">
          {{ ctaText ? ctaText : $t('buttons.all_articles') }}
        </b-button-link>
      </div>
    </div>
  </section>
</template>

<script>
import BContainer from "../../base/grid/b-container";
import BTitle from "../../base/content/b-title";
import BImageCard from "../../base/ui-elements/cards/b-image-card";
import BButtonLink from "../../base/links/b-button-link";
export default {
  name: "ps-blog",
  components: {BButtonLink, BImageCard, BTitle, BContainer},
  props: {
    hasBeautify: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    posts: {
      type: Array,
      default: () => ([])
    },
    ctaText: {
      type: String,
    }
  },
  data() {
    return {
      offset: 0,
      perPage: 4,
    }
  },
  computed: {
    slidesCondition() {
      return this.posts.length > this.perPage;
    },
    activeSlides() {
      const slides = [...this.posts].splice(this.offset, this.perPage);

      if (slides.length === this.perPage) {
        return slides;
      }

      return [
        ...slides,
        ...[...this.posts].splice(0, this.perPage - slides.length),
      ];
    }
  },
  methods: {
    nextSlide() {
      let offset = this.offset + 1;

      if (offset >= this.posts.length) {
        offset = 0;
      }

      this.offset = offset;
    },
    prevSlide() {
      let offset = this.offset - 1;

      if (offset < 0) {
        offset = this.posts.length - 1;
      }

      this.offset = offset;
    }
  },
  created() {
    if(this.$device.isMobile) {
      this.perPage = 2;
    }
  }
}
</script>
