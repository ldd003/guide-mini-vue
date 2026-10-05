import { createRenderer } from "@guide-mini-vue/runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProp(el, key, prevVal, nextVal) {
  const isOn = /^on[A-Z]/.test(key);
  if (isOn) {
    el.addEventListener(key.slice(2).toLocaleLowerCase(), nextVal);
  } else {
    if (nextVal == null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}

function insert(child, parent, anchor) {
  // parent.append(child)
  parent.insertBefore(child, anchor || null);
}

function remove(child) {
  // child.remove();
  const parent = child.parentNode;
  if (parent) {
    parent.removeChild(child);
  }
}

function setElementText(el, text) {
  el.textContent = text;
}

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
});

export function createApp(...args) {
  return renderer.createApp(...args);
}

export * from "@guide-mini-vue/runtime-core";
