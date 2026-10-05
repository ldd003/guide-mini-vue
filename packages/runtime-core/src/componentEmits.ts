import { toHandleKey, camelize } from "@guide-mini-vue/shared";

export function emit(instance, event, ...args) {
  const { props } = instance;

  const handlerName = toHandleKey(camelize(event));
  if (props[handlerName]) {
    props[handlerName](...args);
  }
}
