import { h, ref } from "../../lib/guide-mini-vue.esm.js";

export default {
  setup() {
    const count = ref(1);
    const add = () => {
      count.value++;
    };

    return {
      count,
      add,
    };
  },
  render() {
    return h("div", {}, [
      h("p", {}, "hello" + this.count),
      h(
        "button",
        {
          onClick: this.add,
        },
        "点击",
      ),
    ]);
  },
};
