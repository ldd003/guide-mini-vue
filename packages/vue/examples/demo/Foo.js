import { h } from "../../dist/guide-mini-vue.esm.js";
export const Foo = {
  name: "Foo",
  setup() {
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    return h("div", { class: "foo" }, [foo]);
  },
};
