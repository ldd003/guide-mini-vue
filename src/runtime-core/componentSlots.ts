import { ShapeFlags } from "../shared/ShapeFlags";

export const initSlots = (instance, children) => {
  const { vnode } = instance;
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
};

function normalizeObjectSlots(children, slots) {
  for (let key in children) {
    let val = children[key];
    slots[key] = (props) => normalizeSlotsValue(val(props));
  }
}

function normalizeSlotsValue(val) {
  return Array.isArray(val) ? val : [val];
}
