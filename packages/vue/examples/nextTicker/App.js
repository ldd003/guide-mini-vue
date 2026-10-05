import {
  h,
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
} from "../../dist/guide-mini-vue.esm.js";

// import NextTicker from "./NextTicker.js";

export default {
  name: "App",
  setup() {
    const count = ref(1);
    const instance = getCurrentInstance();
    async function onClick() {
      for (let i = 0; i < 100; i++) {
        console.log("update---");
        count.value = i;
      }
      debugger;
      console.log(87, instance);
      nextTick(() => {
        debugger;
        console.log(98, instance);
      });
      await nextTick();
      // console.log(777, instance);
      // debugger;
    }
    return {
      onClick,
      count,
    };
  },

  render() {
    // return h("div", { tId: 1 }, [h("p", {}, "主页"), h(NextTicker)]);
    const button = h("buttong", { onClick: this.onClick }, "update");
    const p = h("p", {}, "count:" + this.count);
    return h("div", {}, [button, p]);
  },
};
