import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  setup() {
    return {
      msg: "mini-vue",
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        class: ["red", "big"],
      },
      // "hi " + this.msg,
      // "hi mini-vue",
      [
        h("p", { class: "red" }, "hello"),
        h("p", { class: "blue" }, "mini-vue"),
      ],
    );
  },
};
