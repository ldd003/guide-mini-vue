import { h, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";
export const Foo = {
  name: "Foo",
  setup() {
    const instance = getCurrentInstance();
    console.log("Foo实例--", instance);
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    return h("div", { class: "foo" }, [foo]);
  },
};
