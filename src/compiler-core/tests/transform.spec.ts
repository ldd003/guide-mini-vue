import { baseParse } from "../src/parse";

import { transform } from "../src/transform";
import { NodeTypes } from "../src/ast";

describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>Hi,{{message}}</div>");

    // expect(ast.children[0]).toStrictEqual({
    //   type: NodeTypes.ELEMENT,
    //   tag: "div",
    //   children: [
    //     {
    //       type: NodeTypes.TEXT,
    //       content: "Hi,",
    //     },
    //     {
    //       type: NodeTypes.INTERPOLATION,
    //       content: {
    //         type: NodeTypes.SIMPLE_EXPRESSION,
    //         content: "message",
    //       },
    //     },
    //   ],
    // });

    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT) {
        node.content = node.content + " mini-vue";
      }
    };

    transform(ast, {
      nodeTransforms: [plugin],
    });
    const nodeText = ast.children[0].children[0];
    expect(nodeText.content).toBe("Hi, mini-vue");
  });
});
