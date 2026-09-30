export const extend = Object.assign;
export const isObject = (val: any) => {
  return val !== null && typeof val === "object";
};
export const hasChanged = (newVal, oldVal) => {
  return !Object.is(newVal, oldVal);
};
export function hasOwn(obj = {}, key) {
  return Object.hasOwn(obj, key);
}

export const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, m) => {
    return m ? m.toUpperCase() : "";
  });
};
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const toHandleKey = (str) => {
  return str ? "on" + capitalize(str) : "";
};
