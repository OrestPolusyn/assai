<template>
  <header class="c-header-sect">
    <div class="c-header">
      <ch-menu @click="setActiveSlide('company')"
               :visible="activeSlide === 'company'"
               :menu-list="solutionsList"
               class="--solutions" main-title="Solutions"/>
<!--      <ch-menu @click="setActiveSlide('company')"-->
<!--               :visible="activeSlide === 'company'" class="&#45;&#45;company" main-title="Company"/>-->
      <ch-slider @click="setActiveSlide('main')"
                 :sliders="mainSlider"
                 :visible="activeSlide === 'main'"/>
    </div>
  </header>
</template>

<script>
import ChSlider from "./header/ch-slider";
import ChMenu from "./header/ch-menu";
export default {
  name: "ps-header",
  components: {ChMenu, ChSlider},
  props: {
    mainSlider: {
      type: Array,
      default: () => ([])
    },
    solutionsList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      activeSlide: 'main'
    }
  },
  methods: {
    setActiveSlide(value) {
      if(value === 'main') {
        this.$router.push(this.localePath('/contact'));
        return;
      }

      if(this.activeSlide === value) {
        this.activeSlide = 'main';
        return;
      }
      this.activeSlide = value;
    }
  },
}
</script>
