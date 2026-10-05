import { h } from "../../dist/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  setup() {
    return {};
  },
  render() {
    const app = h("div", {}, "app");
    const foo = h(Foo);
    return h("div", { class: "app" }, [app, foo]);
  },
};
