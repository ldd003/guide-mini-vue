import { h, getCurrentInstance } from "../../dist/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  setup() {
    const instance = getCurrentInstance();
    console.log("APP实例--", instance);
    return {};
  },
  render() {
    const app = h("div", {}, "app");
    const foo = h(Foo);
    return h("div", { class: "app" }, [app, foo]);
  },
};
