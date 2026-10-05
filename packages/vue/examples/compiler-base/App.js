import { h, ref } from "../../dist/guide-mini-vue.esm.js";

export const App = {
  name: "App",
  template: "<div>Hi2,{{count}}</div>",
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
