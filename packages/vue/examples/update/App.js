import { h, ref } from "../../dist/guide-mini-vue.esm.js";

export default {
  name: "App",
  setup() {
    const count = ref(0);
    const props = ref({
      foo: "foo",
      bar: "bar",
    });

    const onClick = () => {
      count.value++;
    };

    const onClick1 = () => {
      props.value.foo = "foos";
    };
    const onClick2 = () => {
      props.value.foo = undefined;
    };
    const onClick3 = () => {
      props.value = {
        foo: "foo",
      };
    };

    return {
      count,
      onClick,
      props,
      onClick1,
      onClick2,
      onClick3,
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        ...this.props,
      },
      [
        h("p", {}, "count:" + this.count),
        h(
          "button",
          {
            onClick: this.onClick,
          },
          "点击",
        ),
        h(
          "button",
          {
            onClick: this.onClick1,
          },
          "点击1",
        ),
        h(
          "button",
          {
            onClick: this.onClick2,
          },
          "点击2",
        ),
        h(
          "button",
          {
            onClick: this.onClick3,
          },
          "点击3",
        ),
      ],
    );
  },
};
