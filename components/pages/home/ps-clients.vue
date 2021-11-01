<template>
  <section class="ps-front-clients-sect">
    <beautify class="ps-client-svg"/>
    <b-container>
      <div class="ps-front-clients">
        <div class="ps-front-clients__wrap ps-front-clients__wrap_top">
          <b-title class-level="2" level="2">
            {{ title }}
          </b-title>
          <div class="ps-front-clients__arrows" v-if="slides.length > perPage">
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
        </div>
        <div class="ps-front-clients__wrap ps-front-clients__wrap_bot">
          <figure v-for="(slide, index) in activeSlides"
                  :key="slide.media + '_' + index"
                  class="ps-front-clients__slide">
            <img :src="slide.media" :alt="slide">
          </figure>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import beautify from '@/assets/img/clients-bg.svg?inline';
import BContainer from "../../base/grid/b-container";
import BTitle from "../../base/content/b-title";
export default {
  name: "ps-clients",
  components: {BTitle, BContainer, beautify},
  props: {
    title: {
      type: String,
      default: 'Our Customers'
    },
    slides: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      offset: 0,
      perPage: 6,
    }
  },
  computed: {
    slidesCondition() {
      return this.slides.length > this.perPage;
    },
    activeSlides() {
      const slides = [...this.slides].splice(this.offset, this.perPage);

      if (slides.length === this.perPage) {
        return slides;
      }

      return [
        ...slides,
        ...[...this.slides].splice(0, this.perPage - slides.length),
      ];
    }
  },
  methods: {
    nextSlide() {
      let offset = this.offset + 1;

      if (offset >= this.slides.length) {
        offset = 0;
      }

      this.offset = offset;
    },
    prevSlide() {
      let offset = this.offset - 1;

      if (offset < 0) {
        offset = this.slides.length - 1;
      }

      this.offset = offset;
    }
  },
  created() {
    if(this.$device.isMobile) {
      this.perPage = 3;
    }
  }
}
</script>
