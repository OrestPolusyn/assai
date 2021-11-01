<template>
  <div class="b-select">
    <label class="b-select__label">
      {{ label }}
    </label>
    <div class="b-select__el-wrap">
      <select class="b-select__el" @input="emit_value">
        <option value="" selected>{{ placeholder }}</option>
        <option v-for="option in options"
                :value="typeof option === 'object' ? option.key : option">
          {{ typeof option === 'object' ? option.type : option }}
        </option>
      </select>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1L7.29257 7L1 1" stroke="#081236" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-select",
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    options: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String,
      default: 'Select item'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit_value($event) {
      const targetValue = $event.target.value;

      this.$emit('input', targetValue);
    }
  },
}
</script>
