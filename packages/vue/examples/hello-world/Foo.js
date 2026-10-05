import { h } from "../../dist/guide-mini-vue.esm.js";

export const Foo = {
  setup(props) {
    console.log(100, props);
    props.count++;
    console.log(200, props);
  },
  render() {
    return h("div", {}, "foo:" + this.count);
  },
};
