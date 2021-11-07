<template>
  <section class="b-careers" :class="{ dark: hasBeautify }">
    <b-container>
      <div class="b-careers__head">
        <b-title level="2" class-level="2"> Careers </b-title>
        <div class="b-careers__head-box">
          <a class="b-careers__btn b-button --border" href="/contact">
            <span> Contact Us </span>
          </a>

          <div class="b-careers__buttons">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 26L26 0L-3.43595e-09 13.0765L26 26Z"
                fill="#F7F7F7"
              ></path>
            </svg>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.27982e-06 -2.27299e-06L0 26L26 12.9235L2.27982e-06 -2.27299e-06Z"
                fill="#F7F7F7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="b-careers__main">
        <div class="b-careers__wrap b-careers__wrap_left">
          Over our 30-year history, Assai has grown from a local IT company to a
          worldwide vendor of our document control and management solution, with
          a worldwide network of offices, distributors, and agents.
        </div>

        <div class="b-careers__wrap b-careers__wrap_right">
          <div class="b-careers__card">
            <div class="b-careers__card-head">
              <b-title class-level="3" level="3">
                Assistant Financial Controller
              </b-title>
            </div>
            <span> Location: Culemborg, The Netherlands </span>
            <div class="b-careers__text">
              Send us your CV and motivation letter to hrm@assai.nl and if you
              are a fit, we will be in touch.
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import BTitle from "./b-title";
import BContainer from "../grid/b-container";
export default {
  name: "b-careers",
  components: { BContainer, BTitle },
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
    hasBeautify: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    reviewsArray() {},
  },
  methods: {
    nextSlide() {
      if (this.currentIndex === this.reviews.length - 1) return;

      this.currentIndex += 1;
    },
    prevSlide() {
      if (this.currentIndex === 0) return;

      this.currentIndex -= 1;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/base/components/content/careers-change";
</style>
