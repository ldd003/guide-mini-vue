import { trackEffect, triggerEffect, isTracking } from "./effect";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";
class refImpl {
  constructor(val) {
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
