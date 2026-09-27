import { extend } from "../shared";

let targetMap = new Map();
let activeEffect = null;

class ReactiveEffect {
  constructor(fn, scheduler) {
    this._fn = fn;
    this.scheduler = scheduler;
    this.deps = [];
    this.active = true;
  }
  run() {
    activeEffect = this;
    const res = this._fn();
    activeEffect = null;
    return res;
  }
  stop() {
    if (this.active) {
      cleanuoEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanuoEffect(effect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
}

export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
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
  activeEffect.deps.push(deps);
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    for (const effect of dep) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}

export function stop(runner) {
  runner.effect.stop();
}
