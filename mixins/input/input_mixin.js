import validation from "@/form-validation";
import base_input_methods from "@/mixins/input/base_input_methods";

export default {
  mixins: [base_input_methods],
  props: {
    name: {
      type: String,
      default: 'input_name'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: null
    },
    check_empty: {
      type: Boolean,
      default: false,
    },
    check_email: {
      type: Boolean,
      default: false,
    },
    numbers_only: {
      type: Boolean,
      default: false
    },
    check_phone: {
      type: Boolean,
      default: false,
    },
    field_name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    emit_local: {
      type: Boolean,
      default: false
    },
    check_month_day: {
      type: Boolean,
      default: false
    },
    check_month: {
      type: Boolean,
      default: false
    },
    check_year: {
      type: Boolean,
      default: false
    },
    is_focused: {
      type: Boolean,
      default: false
    },
    check_password: {
      type: Boolean,
      default: false
    },
    confirm_password: {
      type: Boolean,
      default: false
    },
    main_password_value: {
      type: String,
      default: ''
    },
    hide_error_messages: {
      type: Boolean,
      default: false
    },
    emit_error_message: {
      type: Boolean,
      default: false
    },
    max_value_length: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      val: this.value || '',
      isFocus: false
    }
  },
  computed: {
    error() {
      if(this.check_empty && validation.check_empty_field(this.val)) return this.$t('errors.empty');

      if(this.check_email && validation.check_email_field(this.val)) return this.$t('errors.email_not_valid');

      if(this.check_phone && validation.check_phone_number(this.val)) return this.$t('errors.phone_number_not_valid');

      // // DOB validation
      //
      // if(this.check_month_day && validation.check_month_day(this.val)) return 'errors.invalid_day';
      //
      // if(this.check_month && validation.check_month(this.val)) return 'errors.invalid_month';
      //
      // if(this.check_year && validation.check_year(this.val)) return 'errors.year_invalid';
      //
      // Password validation

      if(this.check_password && validation.check_password_field(this.val)) return this.$t('errors.ease_password');

      if(this.confirm_password && validation.confirm_password_field(this.val, this.main_password_value)) return this.$t('errors.password_is_not_match');

      return false;
    },
  },
  methods: {
    clear_value() {
      if(this.numbers_only) this.val = validation.value_numbers_only(this.val);

      if(this.check_email) this.val = validation.clear_email_field(this.val);

      if(this.check_phone) this.val = validation.clean_phone_value(this.val)

      if(this.max_value_length && !!this.val && this.val.length > this.max_value_length) {
        this.val = this.val.slice(0, this.max_value_length);
      }
    },
    emit_changes() {
      this.clear_value();
      this.emit_validation();

      this.emit_helper('input');
    },
    emit_blur() {
      this.show_validation = true;
      this.emit_validation();
      // this.emit_helper('blur');
      this.isFocus = false;
    },
    emit_focus() {
      // this.emit_helper('focus');
      this.isFocus = true;
    },
    emit_helper(emit_type) {
      if(typeof this.val === 'object') {
        return;
      }
      let valueWithoutSpaces = this.val ? this.val.trim() : this.val;

      if(this.emit_local) {
        this.$emit(emit_type, valueWithoutSpaces);
        return
      }
      this.$emit(emit_type, { name: this.field_name, value: valueWithoutSpaces });
    }
  },
  watch: {
    is_focused() {
      this.isFocus = this.is_focused;
      this.$refs.input_el.focus();
    },
    value(new_val) {
      this.val = new_val;
    }
  }
}
