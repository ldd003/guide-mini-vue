import { trackEffect, triggerEffect } from "./effect";

class refImpl {
  constructor(val) {
    this.dep = new Set();
    this._value = val;
  }
  get value() {
    trackEffect(this.dep);
    return this._value;
  }
  set value(newVal) {
    this._value = newVal;
    triggerEffect(this.dep);
  }
}
export function ref(val) {
  return new refImpl(val);
}
