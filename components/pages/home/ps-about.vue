<template>
  <section class="ps-about-sect">
    <b-container>
      <div class="ps-about">
        <div class="ps-about__wrap ps-about__wrap_left">
          <b-title class-level="2" level="2" class="ps-about__title">
            {{ title }}
          </b-title>
          <p class="ps-about__text">
            {{ content }}
          </p>
          <b-button-link to="/contact" class="--border --primary-font-color">
            Contact us
<!--            {{ $t('buttons.readMore') }}-->
          </b-button-link>
        </div>
        <figure v-if="video" class="ps-about__wrap ps-about__wrap_right" @click.self="pauseVideo">
          <video :src="video" ref="video"></video>
          <div class="ps-about__poster" :class="{ hide: visibleVideo }" @click="playVideo">
            <img :src="videoPoster" alt="video poster">
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.27277 0.0898929L0.272766 48.7236L48.7275 24.2637L0.27277 0.0898929Z" fill="#0080FF"/>
            </svg>
          </div>
        </figure>
      </div>
    </b-container>
  </section>
</template>

<script>
import BContainer from "../../base/grid/b-container";
import BTitle from "../../base/content/b-title";
import BButtonLink from "../../base/links/b-button-link";
export default {
  name: "ps-about",
  components: {BButtonLink, BTitle, BContainer},
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: ''
    },
    videoPoster: {
      type: String,
      default: '/img/front/video-poster.jpg'
    }
  },
  data() {
    return {
      visibleVideo: false,
    }
  },
  methods: {
    playVideo() {
      this.visibleVideo = true;
      this.$refs.video.play();
    },
    pauseVideo() {
      if(!this.visibleVideo) return;

      this.visibleVideo = false;
      this.$refs.video.pause();
    }
  },
}
</script>
