import { toHandleKey, camelize } from "../shared";
export function emit(instance, event, ...args) {
  const { props } = instance;

  const handlerName = toHandleKey(camelize(event));
  if (props[handlerName]) {
    props[handlerName](...args);
  }
}
