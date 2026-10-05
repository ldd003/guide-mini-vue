import { readonly, isReadonly, isProxy } from "../src/reactive";
import { vi } from "vitest";

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
    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(origin)).toBe(false);
    expect(isReadonly(wrapper.bar)).toBe(true);
    expect(isReadonly(origin.bar)).toBe(false);
    expect(isProxy(wrapper)).toBe(true);
  });

  it("warn when call set", () => {
    const origin = {
      foo: 1,
    };
    console.warn = vi.fn();
    const wrapper = readonly(origin);
    wrapper.foo = 2;
    expect(console.warn).toHaveBeenCalled();

    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(origin)).toBe(false);
  });
});
