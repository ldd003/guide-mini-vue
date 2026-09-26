let targetMap = new Map();
let activeEffect = null;

class ReactiveEffect {
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
    activeEffect = null;
  }
}

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

export function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(activeEffect);
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    for (const effect of dep) {
      effect.run();
    }
  }
}
