export default {
  data() {
    return {
      show_validation: false,
    }
  },
  created() {
    this.emit_validation();
  },
  methods: {
    emit_validation() {
      this.$emit('update:validation_error', this.error);

      if(this.emit_error_message) {
        this.$emit('validation-error-message', this.visible_error);
      }
    },
  },
  computed: {
    visible_error() {
      return this.show_validation ? this.error : false;
    },
  },
}
