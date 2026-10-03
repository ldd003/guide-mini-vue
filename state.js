function test(str) {
  let i;
  let startIndex;
  let endIndex;
  const result = [];
  function waitForA(s) {
    if (s === "a") {
      startIndex = i;
      return waitForB;
    }
    return waitForA;
  }
  function waitForB(s) {
    if (s === "b") {
      return waitForC;
    }
    return waitForA;
  }
  function waitForC(s) {
    if (s === "c" || s === "d") {
      endIndex = i;
      return end;
    }
    return waitForA;
  }

  function end() {
    return end;
  }

  let currentState = waitForA;
  for (i = 0; i < str.length; i++) {
    let nextState = currentState(str[i]);
    currentState = nextState;

    if (currentState === end) {
      console.log(99, startIndex, endIndex);
      result.push({
        start: startIndex,
        end: endIndex,
      });
      // console.log(77, result);
      currentState = waitForA;
      // return true;
    }
  }

  // return false;
}

// console.log(test("abc"));
console.log(test("dabc12abd"));
