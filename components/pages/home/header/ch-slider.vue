<template>
  <div class="ch-header-slider" :class="{ visible: visible }">
    <div class="ch-header-slider__hide-overlay"
         @click="$emit('click')"
         :class="{ visible: !visible }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 3.26809e-07L2.56154e-07 0L12.0706 24L24 3.26809e-07Z" fill="#F7F7F7"/>
      </svg>
      <b-title class-level="2" level="2" class="ch-header-slider__hide-title">
        Book a Demo
      </b-title>
    </div>
    <ch-slide v-for="(slide, index) in sliders"
              :class="{ active: index === currentSlide }"
              :title="slide.title"
              :subtitle="slide.description"
              :button-link="slide.ctaLink"
              :button-text="slide.ctaTitle"
              :image="slide.media"
              :key="slide.text"/>
    <div class="ch-header-slider__controls">
      <div class="ch-header-slider__counter">
        {{ currentSlide + 1 }} / {{ sliders.length }}
      </div>
      <div class="ch-header-slider__controls-view">
        <span v-for="(_, index) in sliders"
              @click="setSlideIndex(index)"
              :class="{ active: index === currentSlide }"
              :key="index"></span>
      </div>
    </div>
  </div>
</template>

<script>
import ChSlide from "./ch-slide";
import BTitle from "../../../base/content/b-title";
export default {
   name: "ch-slider",
  components: {BTitle, ChSlide},
  props: {
    sliders: {
      type: Array,
      default: () => ([])
    },
    visible: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      interval: null,
      currentSlide: 0
    }
  },
  methods: {
    setupSlide() {
      this.interval = setInterval(() => {
        const nextSlide = this.currentSlide + 1;

        if(nextSlide >= this.sliders.length) {
          this.currentSlide = 0;
        } else {
          this.currentSlide += 1;
        }
      }, 3000);
    },
    setSlideIndex(index) {
      clearInterval(this.interval);
      this.currentSlide = index;
      this.setupSlide();
    },
  },
  mounted() {
    if(process.server) return;

    this.setupSlide();

  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>
