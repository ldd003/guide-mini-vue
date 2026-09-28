import { trackEffect, triggerEffect, isTracking } from "./effect";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";
class refImpl {
  constructor(val) {
    this.__v_isRef = true;
    this._rawValue = val;
    this.dep = new Set();
    this._value = convertValue(val);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = convertValue(newVal);
      triggerEffect(this.dep);
    }
  }
}

function convertValue(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}

export function ref(val) {
  return new refImpl(val);
}

export function isRef(val) {
  return !!val.__v_isRef;
}

export function unRef(val) {
  return isRef(val) ? val.value : val;
}

export function proxyRefs(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return unRef(Reflect.get(target, key, receiver));
    },
    set(target, key, val, receiver) {
      if (isRef(target[key]) && !isRef(val)) {
        return (target[key].value = val);
      } else {
        return Reflect.set(target, key, val, receiver);
      }
    },
  });
}
