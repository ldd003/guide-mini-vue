import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  render() {
    return h("div", { id: "root" }, [
      h(
        "div",
        {
          onClick() {
            console.log("app div click");
          },
        },
        "hello-" + this.msg,
      ),
      h(Foo, {
        onAdd(p1, p2) {
          console.log("add--- click", p1, p2);
        },
      }),
    ]);
  },
  setup() {
    return {
      msg: "world",
    };
  },
};
