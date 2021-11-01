<template>
  <b-content-card-wrap class="--text-card">
    <div class="cb-text-card">
      <b-title class-level="4" level="3">
        <nuxt-link :to="localePathHelper('/careers/' + slug)">
          {{ title }}
        </nuxt-link>
      </b-title>
      <div class="cb-text-card__subtitle" v-html="subtitle">
      </div>
      <p class="cb-text-card__text" v-html="content"></p>
    </div>
  </b-content-card-wrap>
</template>

<script>
import BContentCardWrap from "../wrappers/b-content-card-wrap";
import BTitle from "../../content/b-title";
export default {
  name: "b-text-card",
  components: {BTitle, BContentCardWrap},
  props: {
    title: {
      type: String,
      default: 'Assistant Financial Controller',
    },
    subtitle: {
      type: String,
      default: 'Location: Culemborg, The Netherlands',
    },
    content: {
      type: String,
      default: 'Send us your CV and motivation letter to hrm@assai.nl and if you are a fit, we will be in touch.'
    },
    slug: {
      type: String,
      default: 'default-slug'
    }
  },
}
</script>
