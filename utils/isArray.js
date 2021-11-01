export default (val) => {
  return {}.toString.call(val) === "[object Array]";
}
