import { readonly, isReadonly } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const origin = {
      foo: 1,
      bar: {
        baz: 2,
      },
    };
    const wrapper = readonly(origin);
    expect(wrapper).not.toBe(origin);
    expect(wrapper.foo).toBe(1);
  });

  it("warn when call set", () => {
    const origin = {
      foo: 1,
    };
    console.warn = jest.fn();
    const wrapper = readonly(origin);
    wrapper.foo = 2;
    expect(console.warn).toHaveBeenCalled();

    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(origin)).toBe(false);
  });
});
