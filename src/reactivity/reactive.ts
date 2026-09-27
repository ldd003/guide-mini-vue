import { mutableHandler, readonlyHandler } from "./baseHandlers";

export function reactive(raw: any) {
  return createReactiveObject(raw, mutableHandler);
}

export function readonly(raw: any) {
  return createReactiveObject(raw, readonlyHandler);
}

function createReactiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
