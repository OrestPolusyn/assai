export default ({ slug, getters, stateField, locale }) => {
  const lowercaseSlug = slug.toLowerCase();
  const currentCategoriesObject = getters.getField(stateField);
  const hasLocaleObjects = locale in currentCategoriesObject;

  if(!hasLocaleObjects) return true;

  const categoryLocaleObject = currentCategoriesObject[locale];

  const hasData = !(lowercaseSlug in categoryLocaleObject);

  if(hasData) return true;

  const obj =  categoryLocaleObject[lowercaseSlug];

  if(!obj) {
    return true;
  }

  if(!('queryDate' in obj)) return true;

  const currentDate = Date.now();
  const spendTime = ((currentDate - obj.queryDate) / (1000 * 60 * 60)).toFixed(1);

  return spendTime;
}
