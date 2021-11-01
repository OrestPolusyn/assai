<script>
export default {
  name: "b-button",
  props: {
    type: {
      type: String,
      default: 'button'
    },
    theme: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  functional: true,
  render: function (create_element, { data, children, listeners, props }) {
    data.staticClass = data.staticClass ? data.staticClass + ' b-button' : 'b-button';

    if(props.theme.length > 0) {
      const { theme } = props;

      if(theme.includes(',')) {
        const modifierArray = theme.split(',');

        for(let modifier of modifierArray) {
          data.staticClass += ` --${modifier}`;
        }
      } else {
        data.staticClass = `${data.staticClass} --${props.theme}`
      }
    }

    const span = create_element('span', {}, [...children]);

    return create_element('button', data, [span], listeners);
  }
}
</script>
