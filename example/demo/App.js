import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  render() {
    return h("div", { id: "root" }, [
      h("div", {}, "hello-" + this.msg),
      h(Foo),
    ]);
  },
  setup() {
    return {
      msg: "world",
    };
  },
};
