<template>
  <div class="b-dropdown">
    <div class="b-dropdown__main">
      {{ currentValue }}
      <svg v-if="nestedItems.length > 0" width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8.53135e-08L8.34742e-08 0L3.52059 7L7 8.53135e-08Z" fill="#F7F7F7"/>
      </svg>
    </div>
    <ul class="b-dropdown__list" v-if="nestedItems.length > 0">
      <li class="b-dropdown__list-items"
          v-for="item in nestedItems"
          :key="item.placeholder">
        <button @click="$emit('input', item.value)" class="b-dropdown__list-link">
          {{ item.placeholder }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "b-dropdown-buttons",
  props: {
    placeholder: {
      type: String,
      default: 'Dropdown'
    },
    nestedItems: {
      type: Array,
      default: () => ([])
    },
  },
  computed: {
    currentValue() {
      const selectedItem = this.nestedItems.find(el => el.value === this.placeholder);

      if(selectedItem) {
        return `Sort by ${selectedItem.placeholder}`
      }

      return 'Sort by'
    }
  },
}
</script>
