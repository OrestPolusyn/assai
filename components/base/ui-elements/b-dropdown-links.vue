<template>
  <div class="b-dropdown">
    <nuxt-link :to="localePathHelper(mainLinkPath)" class="b-dropdown__main">
      {{ mainLinkName }}
      <svg v-if="hasNestedItems" width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8.53135e-08L8.34742e-08 0L3.52059 7L7 8.53135e-08Z" fill="#F7F7F7"/>
      </svg>
    </nuxt-link>
    <ul class="b-dropdown__list" v-if="hasNestedItems">
      <li class="b-dropdown__list-items"
          v-for="link in nestedList"
          :key="link.name">
        <nuxt-link :to="localePathHelper(link.path)" class="b-dropdown__list-link">
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "b-dropdown-links",
  props: {
    mainLinkPath: {
      type: String,
      default: '/'
    },
    mainLinkName: {
      type: String,
      default: '/'
    },
    nestedList: {
      type: Array,
      default: () => ([])
    },
  },
  computed: {
    hasNestedItems() {
      return this.nestedList.length > 0;
    }
  },
}
</script>
