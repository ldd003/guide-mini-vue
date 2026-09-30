import { publicInstanceProxyHandlers } from "./componentPublicInstance";
import { initProps } from "./componentProps";
import { emit } from "./componentEmits";
import { shallowReadonly } from "../reactivity/reactive";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component);
  return component;
}

export function setupComponent(instance) {
  //initProps
  //initSlots
  initProps(instance, instance.vnode.props);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance) {
  const Component = instance.type;
  instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);

  const { setup } = Component;

  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult) {
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  finishSetupComponent(instance);
}

function finishSetupComponent(instance) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;
  }
}
