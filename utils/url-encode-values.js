function isArray(val) {
  return {}.toString.call(val) === "[object Array]";
}

function isObject(val) {
  return !isArray(val) && val !== null && typeof val === "object" && !!val && !(val instanceof Blob) && !(val instanceof Date);
}

function generateEncodeUrl(key, value, formData) {
  formData.append(key, value);
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
}

function urlEncodeValues (data = {}, { parentPropName = null, mainPropKey = null, PropIndex = null, formData}) {
  return Object.entries(data)
    .filter(function isDefined ([, value]) {
      return value !== undefined;
    })
    .map(function ([key, value]) {
      if(isArray(value)) {

        if(value.length === 0) {
          let val = key === 'images' ? null : '';
          return generateEncodeUrl(`${parentPropName}[${key}]`, val, formData);
        }

        for (let i = 0; i <= value.length; i++) {
          urlEncodeValues(value[i], {
            parentPropName: key,
            mainPropKey: parentPropName,
            PropIndex: i,
            formData
          });
        };
        return;
      }

      if(isObject(value)) {

        return urlEncodeValues(value, {
          parentPropName: key,
          formData
        });
      }

      if(mainPropKey) {
        return generateEncodeUrl(`${mainPropKey}[${parentPropName}][${PropIndex}][${key}]`, value, formData);
      }

      if(parentPropName && !isObject(parentPropName)) {
        return generateEncodeUrl(`${parentPropName}[${key}]`, value, formData);
      }

      return generateEncodeUrl(key, value, formData);
    })
    .join('&');
}

export default (data = {}) => {
  const formData = new FormData();

  urlEncodeValues(data, { formData });

  return formData;
}
