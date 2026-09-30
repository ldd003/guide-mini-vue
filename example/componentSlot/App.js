import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  setup() {
    return {};
  },
  render() {
    const app = h("div", {}, "app");
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h(
            "p",
            {
              class: "blue",
            },
            "head1--" + age,
          ),
          h(
            "p",
            {
              class: "blue",
            },
            "head2",
          ),
        ],
        footer: () =>
          h(
            "p",
            {
              class: "blue",
            },
            "foot",
          ),
      },
    );
    // const foo = h(Foo, {}, [
    //   h(
    //     "p",
    //     {
    //       class: "blue",
    //     },
    //     "123",
    //   ),
    //   h(
    //     "p",
    //     {
    //       class: "blue",
    //     },
    //     "456",
    //   ),
    // ]);
    // const foo = h(
    //   Foo,
    //   {},
    //   h(
    //     "p",
    //     {
    //       class: "blue",
    //     },
    //     "123",
    //   ),
    // );
    return h("div", { class: "app" }, [app, foo]);
  },
};
