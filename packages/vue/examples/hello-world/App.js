import { h } from "../../dist/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  setup() {
    return {
      msg: "mini-vue",
    };
  },
  render() {
    queueMicrotask(() => {
      console.log("$el---", this.$el);
    });
    return h(
      "div",
      {
        id: "root",
        class: ["red", "big"],
        onClick() {
          console.log("click事件");
        },
        onMousedown() {
          console.log("mousedown事件");
        },
      },
      // "hi " + this.msg,
      [h("div", {}, "hi" + this.msg), h(Foo, { count: 1 }, "")],
      // ["hi " + this.msg, h(Foo)],
      // "hi mini-vue",
      // [
      //   h(
      //     "p",
      //     {
      //       class: "red",
      //     },
      //     "hello",
      //   ),
      //   h("p", { class: "blue" }, this.msg),
      // ],
    );
  },
};
