import { effect } from "../src/effect";
import { reactive } from "../src/reactive";
import { ref, isRef, unRef, proxyRefs } from "../src/ref";
describe("ref", () => {
  it("happy path", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });

  it("should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value++;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });

  it("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });
    expect(dummy).toBe(1);
    // expect(isReactive(a.value)).toBe(true);
    a.value.count++;
    expect(dummy).toBe(2);
  });

  it("isRef", () => {
    const a = ref(1);
    const b = reactive({
      x: 1,
    });
    expect(isRef(a)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef(b)).toBe(false);
  });

  it("unRef", () => {
    const a = ref(1);
    expect(unRef(a)).toBe(1);
    expect(unRef(1)).toBe(1);
  });

  it("proxyRefs", () => {
    const user = {
      name: "tom",
      age: ref(10),
    };
    const proxyUser = proxyRefs(user);
    expect(user.age.value).toBe(10);
    expect(proxyUser.age).toBe(10);
    expect(proxyUser.name).toBe("tom");

    proxyUser.age = 20;
    expect(user.age.value).toBe(20);
    expect(proxyUser.age).toBe(20);

    proxyUser.age = ref(15);
    expect(user.age.value).toBe(15);
    expect(proxyUser.age).toBe(15);
  });
});
