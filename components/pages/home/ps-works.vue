<template>
  <section class="ps-works-sect">
    <b-container>
      <div class="ps-works">
        <div class="ps-works__slide"
             :class="{ active: currentSlide === index }"
             v-for="(slide, index) in slides" :key="slide.subtitle">
          <figure class="ps-works__slide-wrap ps-works__slide-wrap_ill">
            <img src="/img/front/how-it-works-ill.svg" alt="Ui image">
          </figure>
          <div class="ps-works__slide-wrap ps-works__slide-wrap_content">
            <b-title class-level="2" level="2">
              {{ title }}
            </b-title>
            <div class="ps-works__slide-content">
              <b-title class-level="4" level="3">
                {{ slide.subtitle }}
              </b-title>
              <p class="ps-works__slide-text">
                {{ slide.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="ps-works__controls">
        <div class="ch-header-slider__controls">
          <div class="ps-works__controls-wrapper">
            <div class="ch-header-slider__controls-view">
            <span v-for="(_, index) in Array(slides.length)"
                  :class="{ active: index === currentSlide }"
                  :key="index"></span>
            </div>
            <div class="ch-header-slider__counter">
              {{ currentSlide + 1 }} / {{ slides.length }}
            </div>
          </div>
          <div class="ps-works__buttons">
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
      </div>
    </b-container>
  </section>
</template>

<script>
import BContainer from "../../base/grid/b-container";
import BTitle from "../../base/content/b-title";
export default {
  name: "ps-works",
  components: {BTitle, BContainer},
  props: {
    title: {
      type: String,
      default: ''
    },
    slides: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      currentSlide: 0,
    }
  },
  methods: {
    prevSlide() {
      const newSlideIndex = this.currentSlide - 1;

      if(newSlideIndex < 0) return;

      this.currentSlide = newSlideIndex;
    },
    nextSlide() {
      const newSlideIndex = this.currentSlide + 1;

      if(newSlideIndex === this.slides.length) return;

      this.currentSlide = newSlideIndex;
    }
  },
}
</script>
