import { h, ref } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  name: "App",
  template: "<div>Hi,{{count}}</div>",
  setup() {
    const count = (window.count = ref(1));
    return {
      count,
    };
  },
  //   render() {
  //     return h("div", { class: "cc" }, "hello" + this.count);
  //   },
};
