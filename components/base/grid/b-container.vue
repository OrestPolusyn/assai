<script>
export default {
  name: "b-container",
  functional: true,
  render(create_element, { data, children }) {
    data.staticClass = data.staticClass ? data.staticClass + ' container' : 'container';

    return create_element('div', data, [...children]);
  }
}
</script>
