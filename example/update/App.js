import { h, ref } from "../../lib/guide-mini-vue.esm.js";

export default {
  name: "App",
  setup() {
    const count = ref(0);
    const add = () => {
      count.value++;
    };

    return {
      count,
      add,
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("p", {}, "count:" + this.count),
        h(
          "button",
          {
            onClick: this.add,
          },
          "点击",
        ),
      ],
    );
  },
};
