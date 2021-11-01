<template>
  <div class="b-input">
    <label class="b-input__label">
      {{ label }}
    </label>
    <div class="b-input__el-wrap">
      <input name="name" :type="type"
             ref="input_el"
             @input="emit_changes"
             :placeholder="placeholder"
             @blur="emit_blur"
             @focus="emit_focus"
             :value="value" v-model="val"
             :id='id' class="b-input__el">
    </div>
  </div>
</template>

<script>
import input_mixin from "../../../mixins/input/input_mixin";

export default {
  name: "b-input",
  mixins: [input_mixin],
  props: {
    label: {
      type: String,
      default: 'Input label'
    },
  },
}
</script>
