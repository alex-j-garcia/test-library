"use strict";

let test = Object.create(null);

// test.assertEquals = (actual, expected) => {
//   return false
// };

// 1. a test accepts a string that describes the test
// 2. it accepts a callback, inside which the test is
//    performed
// 3. The callback is executed. It's return value determines
//    whether the test failed or not.
test.test = (string, cb) => {
  let isPass = cb();
  test.showResult(isPass, string);
};

test.showResult = (passed, test) => {
  let div = document.createElement("div");
  div.style.backgroundColor = passed ? "green" : "red";
  div.textContent = test;
  document.body.appendChild(div);
};

// Tests

// Should add a fail to DOM
test.test("Failures should be red", () => false);