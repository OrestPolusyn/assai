<script>
/*
 b-title--1   - 40/45
 b-title--2   - 36/40
 b-title--3   - 28/36
 b-title--4
 b-title--5   - 20/24
 b-title--6   - 18/24

* */
export default {
  name: "b-title",
  props: {
    level: {
      type: String,
      required: true,
      default: '1'
    },
    classLevel: {
      type: String,
      required: true,
      default: '1'
    }
  },
  render: function (createElement) {

    return createElement(
      'h' + this.level,
      {class: 'b-title b-title--' + this.classLevel},
      this.$slots.default
    )
  },
}
</script>
