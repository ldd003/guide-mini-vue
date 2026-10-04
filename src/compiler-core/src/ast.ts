import { TO_CREATE_ELEMENT_VNODE } from "./runTimeHelpers";

export const enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  TEXT,
  ROOT,
  COMPOUND,
}

export const enum TagType {
  START,
  END,
}

export function createVNodeCall(context, tag, props, children) {
  context.helper(TO_CREATE_ELEMENT_VNODE);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    props,
    children,
  };
}
