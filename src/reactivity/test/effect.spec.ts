import { effect, stop } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  it("should return runner when call effect", () => {
    let foo = 1;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(2);
    const r = runner();
    expect(foo).toBe(3);
    expect(r).toBe("foo");
  });

  it("scheduler", () => {
    //1.通过effect的第二个参数 给定的一个scheduler的fn
    //2.effect第一次执行的时候还会执行fn
    //3.当响应式对象set update不会执行fn 而是执行scheduler
    //4.当执行runner的时候，会再次的执行fn
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({
      foo: 1,
    });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        scheduler,
      },
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    //should be called on first called
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    //should not run yet
    expect(dummy).toBe(1);
    //manaul run
    run();
    //should have run
    expect(dummy).toBe(2);
  });

  it("stop", () => {
    let dummy;
    let obj = reactive({
      foo: 1,
    });
    const runner = effect(() => {
      dummy = obj.foo;
    });
    obj.foo = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.foo = 3;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
  });

  it("onStop", () => {
    let dummy;
    const obj = reactive({
      foo: 1,
    });
    let onStop = jest.fn();
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        onStop,
      },
    );
    stop(runner);
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});
