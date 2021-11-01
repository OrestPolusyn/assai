import isArray from "@/utils/isArray";

export default (val) => {
  return !isArray(val) && val !== null && typeof val === "object" && !!val;
}
