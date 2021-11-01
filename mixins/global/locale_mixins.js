export default {
  methods: {
    localePathHelper(pathString, pathLocale) {
      let locale = pathLocale ? pathLocale : this.$i18n.locale;

      if(typeof pathString !== 'string') return this.localePath('/', locale);

      return this.localePath(pathString, locale);
    }
  },
}
