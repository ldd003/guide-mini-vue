import { createComponentInstance, setupComponent } from "./component";
import { ShapeFlages } from "../shared";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  const { shapeFlag } = vnode;
  if (shapeFlag & ShapeFlages.ELEMENT) {
    processElement(vnode, container);
  } else if (shapeFlag & ShapeFlages.STATEFULL_COMPONENT) {
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const { type, props, children, shapeFlag } = vnode;
  const el = (vnode.el = document.createElement(type));

  for (let key in props) {
    el.setAttribute(key, props[key]);
  }
  if (shapeFlag & ShapeFlages.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlages.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(initialVnode, container) {
  const instance = createComponentInstance(initialVnode);
  setupComponent(instance);
  setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance, initialVnode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  // vnode->patch
  // vnode->element->mountElement

  patch(subTree, container);

  initialVnode.el = subTree.el;
}
