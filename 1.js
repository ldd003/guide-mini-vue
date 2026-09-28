// ============================================================
// Vue 3 runtime-core Component Update Flow Mock
//
// 核心流程：
//
// createComponentInstance
//          ↓
// setupComponent
//          ↓
// mountComponent
//          ↓
// setupRenderEffect
//          ↓
// ReactiveEffect
//          ↓
// componentUpdateFn
//          ↓
// render()
//          ↓
// VNode
//          ↓
// patch()
//          ↓
// DOM
//
//
// 更新流程：
//
// reactive state 修改
//          ↓
// trigger
//          ↓
// ReactiveEffect.trigger
//          ↓
// scheduler
//          ↓
// queueJob(instance.job)
//          ↓
// flushJobs
//          ↓
// instance.job()
//          ↓
// instance.update()
//          ↓
// effect.run()
//          ↓
// render()
//          ↓
// patch(oldVNode,newVNode)
// ============================================================

// ============================================================
// 1. reactive
// ============================================================

const targetMap = new WeakMap();

let activeEffect = null;

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);

      return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
      const oldValue = target[key];

      const result = Reflect.set(target, key, value, receiver);

      if (oldValue !== value) {
        trigger(target, key);
      }

      return result;
    },
  });
}

// ============================================================
// 2. track
//
// WeakMap
//   target
//      ↓
//    depsMap
//      ↓
//    key
//      ↓
//    dep(Set)
//      ↓
//    ReactiveEffect
//
// ============================================================

function track(target, key) {
  if (!activeEffect) {
    return;
  }

  let depsMap = targetMap.get(target);

  if (!depsMap) {
    depsMap = new Map();

    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);

  if (!dep) {
    dep = new Set();

    depsMap.set(key, dep);
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);

    activeEffect.deps.push(dep);
  }
}

// ============================================================
// 3. trigger
//
// state.count++
//
//        ↓
//
// 找到依赖 count 的 effect
//
//        ↓
//
// scheduler
//
// ============================================================

function trigger(target, key) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    return;
  }

  const dep = depsMap.get(key);

  if (!dep) {
    return;
  }

  [...dep].forEach((effect) => {
    effect.trigger();
  });
}

// ============================================================
// 4. ReactiveEffect
//
// Vue组件更新本质也是一个 ReactiveEffect
//
// effect.fn
//      ↓
// componentUpdateFn
//      ↓
// render()
//      ↓
// patch()
//
// ============================================================

class ReactiveEffect {
  constructor(fn, scheduler) {
    this.fn = fn;

    this.scheduler = scheduler;

    this.deps = [];
  }

  run() {
    // Vue真实源码这里会 cleanup
    //
    // 防止动态依赖残留：
    //
    // state.ok
    //    ?
    // state.foo
    //    :
    // state.bar
    //
    // 这里为了突出组件流程省略。

    activeEffect = this;

    try {
      return this.fn();
    } finally {
      activeEffect = null;
    }
  }

  trigger() {
    if (this.scheduler) {
      this.scheduler();
    } else {
      this.run();
    }
  }
}

// ============================================================
// 5. Scheduler
//
// Vue核心：
// 状态变化不要立即执行组件更新
//
// 而是：
//
// state change
//      ↓
// queueJob
//      ↓
// Promise microtask
//      ↓
// flushJobs
//
// ============================================================

const queue = [];

let isFlushPending = false;

const resolvedPromise = Promise.resolve();

function queueJob(job) {
  // job identity 去重
  //
  // 同一组件多次修改状态：
  //
  // count++
  //  count++
  //  count++
  //
  // 最终只更新一次

  if (!queue.includes(job)) {
    queue.push(job);
  }

  if (!isFlushPending) {
    isFlushPending = true;

    resolvedPromise.then(flushJobs);
  }
}

function flushJobs() {
  isFlushPending = false;

  for (const job of queue) {
    job();
  }

  queue.length = 0;
}

// ============================================================
// 6. VNode
//
// render 不直接操作 DOM
//
// render:
//      ↓
//    VNode
//
// patch:
//      ↓
//    DOM
//
// ============================================================

function h(type, children) {
  return {
    type,

    children,
  };
}

// ============================================================
// 7. patch
//
// 简化 renderer
//
// Vue真实源码：
//
// patch
//   ↓
// processElement
//   ↓
// mountElement
//   ↓
// patchElement
//   ↓
// patchChildren
//
// 这里只模拟更新文本。
// ============================================================

function patch(oldVNode, newVNode, container) {
  // 首次 mount

  if (!oldVNode) {
    const el = document.createElement(newVNode.type);

    el.textContent = newVNode.children;

    container.appendChild(el);

    newVNode.el = el;
  }

  // update
  else {
    if (oldVNode.children !== newVNode.children) {
      oldVNode.el.textContent = newVNode.children;
    }

    newVNode.el = oldVNode.el;
  }
}

// ============================================================
// 8. createComponentInstance
//
// Vue源码:
// createComponentInstance
//
// 真实还有：
//
// props
// attrs
// slots
// emit
// proxy
// parent
// provides
//
// 这里省略。
// ============================================================

function createComponentInstance(vnode) {
  return {
    vnode,

    type: vnode.type,

    setupState: {},

    render: null,

    subTree: null,

    update: null,

    // Vue源码中会记录是否已经 mount

    isMounted: false,

    // Vue scheduler 使用 job

    job: null,
  };
}

// ============================================================
// 9. setupComponent
//
// setup()
//      ↓
// setupState
//
// render
//      ↓
// instance.render
//
// ============================================================

function setupComponent(instance) {
  const Component = instance.type;

  if (Component.setup) {
    instance.setupState = Component.setup();
  }

  instance.render = Component.render;
}

// ============================================================
// 10. mountComponent
//
// mountComponent
//        ↓
// setupRenderEffect
//
// ============================================================

function mountComponent(instance, container) {
  setupRenderEffect(instance, container);
}

// ============================================================
// 11. setupRenderEffect
//
// ★ Vue组件响应式核心 ★
//
// 这里就是 Vue源码里的 setupRenderEffect
//
// 创建组件 ReactiveEffect
//
// ============================================================

function setupRenderEffect(instance, container) {
  const componentUpdateFn = () => {
    console.log("component update");

    const nextTree = instance.render(instance.setupState);

    // 首次：mount
    //
    // 后续：update
    //
    // Vue真实源码：
    //
    // if(!instance.isMounted){
    //    patch(null,nextTree)
    // }else{
    //    patch(oldTree,nextTree)
    // }

    patch(instance.subTree, nextTree, container);

    instance.subTree = nextTree;

    instance.isMounted = true;
  };

  const effect = new ReactiveEffect(
    componentUpdateFn,

    // scheduler
    //
    // Vue源码：
    //
    // scheduler:
    //   () => queueJob(instance.job)
    //
    // job最终调用instance.update()
    //
    // 这里保持源码语义。

    () => {
      queueJob(instance.job);
    },
  );

  // ========================================================
  // instance.update
  //
  // Vue源码：
  //
  // instance.update =
  //   effect.run.bind(effect)
  //
  // 它代表：
  //
  // "重新执行这个组件更新"
  //
  // ========================================================

  instance.update = effect.run.bind(effect);

  // ========================================================
  // instance.job
  //
  // scheduler真正进入queue的是job
  //
  // 原因：
  //
  // job可以附加：
  //
  // id
  // instance
  // flags
  //
  // 用于更新排序和调试。
  //
  // 学习版只保留调用 update。
  // ========================================================

  instance.job = () => {
    instance.update();
  };

  // ========================================================
  // 第一次渲染
  //
  // 不经过 scheduler
  //
  // 直接执行。
  //
  // ========================================================

  instance.update();
}

// ============================================================
// 12. createApp
// ============================================================

function createApp(rootComponent) {
  return {
    mount(container) {
      const vnode = {
        type: rootComponent,
      };

      const instance = createComponentInstance(vnode);

      setupComponent(instance);

      mountComponent(instance, container);

      return instance;
    },
  };
}

// ============================================================
// 13. Component
// ============================================================

const App = {
  setup() {
    return reactive({
      count: 0,
    });
  },

  render(state) {
    return h(
      "div",

      `count:${state.count}`,
    );
  },
};

// ============================================================
// 14. mount
// ============================================================

const instance = createApp(App).mount(document.querySelector("#app"));

// ============================================================
// 15. 更新
// ============================================================
//
// count 修改:
//
// trigger
//    ↓
// scheduler
//    ↓
// queueJob(instance.job)
//    ↓
// microtask
//    ↓
// flushJobs
//    ↓
// instance.job()
//    ↓
// instance.update()
//    ↓
// render()
//    ↓
// patch()
//    ↓
// DOM
//
// ============================================================

instance.setupState.count++;

instance.setupState.count++;

instance.setupState.count++;
