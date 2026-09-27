import {
  mutableHandler,
  readonlyHandler,
  shallowReadonlyHandler,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw: any) {
  return createReactiveObject(raw, mutableHandler);
}

export function readonly(raw: any) {
  return createReactiveObject(raw, readonlyHandler);
}

export function shallowReadonly(raw: any) {
  return createReactiveObject(raw, shallowReadonlyHandler);
}

function createReactiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
