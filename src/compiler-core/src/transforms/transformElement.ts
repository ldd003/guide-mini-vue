import { NodeTypes } from "../ast";
import { TO_CREATE_ELEMENT_VNODE } from "../runTimeHelpers";

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      context.helper(TO_CREATE_ELEMENT_VNODE);

      const vnodeTag = node.tag;
      let vnodeProps;
      const children = node.children;
      let vnodeChildren = children[0];

      const vnodeElement = {
        type: NodeTypes.ELEMENT,
        tag: vnodeTag,
        props: vnodeProps,
        children: vnodeChildren,
      };
      node.codegenNode = vnodeElement;
    };
  }
}
