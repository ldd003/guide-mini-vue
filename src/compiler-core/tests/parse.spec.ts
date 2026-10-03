import { baseParse } from "../src/parse";
describe("parse", () => {
  describe("interpolation", () => {
    it("simple interpolation", () => {
      const ast = baseParse("{{message}}   <div>");

      expect(ast.children[0]).toStrictEqual({
        type: "intepolation",
        content: {
          type: "simple_expression",
          content: "message",
        },
      });
    });
  });
});
