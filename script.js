"use strict";

let test = Object.create(null);

// 1. a test accepts a string that describes the test
// 2. it accepts a callback, inside which the test is
//    performed
// 3. The callback is executed. It's return value determines
//    whether the test failed or not.
test.test = (string, cb) => {
  let isPass = cb();
  test.showResult(isPass, string);
  test.scrollToLast();
};

// checking the types eliminates
   // 1 --> "string"
   // 1 --> [], {}
   // "string" --> objects
   // 1 --> undefined
// does not eliminate
   // {} & [] are both of type object
   // historical bug: null is of type object
   // null loosely equals undefined
test.assertEquals = (actual, expected) => {
  if (typeof actual != typeof expected) return false;
  else return actual === expected;
};

/*
 * TODO:
 * test.assertDeepEquals should check properties of different objects
 * (should probably check properties recursively)
 */

// DOM manipulation
test.showResult = (passed, test) => {
  let div = document.createElement("div");
  div.style.backgroundColor = passed ? "green" : "red";
  div.textContent = test;
  document.body.appendChild(div);
};

test.scrollToLast = () => {
  let body = document.querySelector("body");
  let bodyBottom = body.getBoundingClientRect().bottom;
  let windowHeight = window.innerHeight;
  if (windowHeight < bodyBottom) {
    window.pageYOffset = windowHeight + bodyBottom;
  }
};

// Tests

// Should add a fail to DOM
test.test("Failures should be red", () => false);

// Should add a pass to the DOM
test.test("Passed tests should be green", () => true);

// A number should equal itself
test.test("assertEquals - 1 equals 1", () => test.assertEquals(1, 1));

// Two different numbers should not equal each other
test.test(
  "assertEquals - 1 doesn't equals 2 - red",
  () => test.assertEquals(1, 2)
);

// Two equal strings should return true
test.test(
  "assertEquals - 'hello' equals 'hello'",
  () => test.assertEquals("hello", "hello")
);

// Two unequal strings should return false
test.test("assertEquals - 'Hello' doesn't equal 'hello' - red", () => {
  test.assertEquals("Hello", "hello");
});

// Two different objects should not equal each other
test.test(
  "assertEquals - two different objects should not be equal - red",
  () => test.assertEquals({}, {})
);

// assertEquals - the same object should equal each other
test.test("assertEquals - The same object should equal itself", () => {
  let obj = Object.create(null);
  let pointer = obj;
  return test.assertEquals(obj, pointer);
});

// assertEquals - An array should not equal an object
test.test(
  "assertEquals - An array should not equal an object - red",
  () => test.assertEquals([], {})
);

// assertEquals - An array should not equal another array
test.test(
  "assertEquals - an array should not equal another array - red",
  () => test.assertEquals([], [])
);
