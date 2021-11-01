<template>
  <div class="b-textarea">
    <label class="b-textarea__label">
      {{ label }}
    </label>
    <div class="b-textarea__el-wrap">
      <textarea name="name" :type="type"
                ref="input_el"
                @input="emit_changes"
                :placeholder="placeholder"
                @blur="emit_blur"
                @focus="emit_focus"
                :value="value" v-model="val"
                :id='id'
                class="b-textarea__el"></textarea>
    </div>
  </div>
</template>

<script>
import input_mixin from "../../../mixins/input/input_mixin";

export default {
  name: "b-textarea",
  mixins: [input_mixin],
  props: {
    label: {
      type: String,
      default: 'Input label'
    },
  },
}
</script>
