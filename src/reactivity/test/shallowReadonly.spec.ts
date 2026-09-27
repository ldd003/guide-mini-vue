import { shallowReadonly, isReadonly } from "../reactive";

describe("shallowReadonly", () => {
  it("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({
      n: {
        foo: 1,
      },
    });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it("warn when call set", () => {
    const origin = {
      foo: 1,
    };
    console.warn = jest.fn();
    const wrapper = shallowReadonly(origin);
    wrapper.foo = 2;
    expect(console.warn).toHaveBeenCalled();

    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(origin)).toBe(false);
  });
});
