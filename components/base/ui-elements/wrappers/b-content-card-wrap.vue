<script>
export default {
  name: "b-content-card-wrap",
  functional: true,
  render(create_element, { data, children }) {
    data.staticClass = data.staticClass ? data.staticClass + ' bc-content-card-wrap' : 'bc-content-card-wrap';

    return create_element('div', data, [...children]);
  }
}
</script>
