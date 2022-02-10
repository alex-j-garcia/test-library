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
test.assertDeepEquals = (actual, expected) => {
  if (actual === expected) return true;
  else if (typeof actual != typeof expected) return false
  else if (actual === null || expected === null) return false;

  let keys1 = Object.keys(actual), keys2 = Object.keys(expected); // ['a', 'b']  ['a', 'b']
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) test.assertDeepEquals(actual[key], expected[key]); // (1, 1)
};

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

// assertEquals - A number should equal itself
test.test("assertEquals - 1 equals 1", () => test.assertEquals(1, 1));

// assertEquals - Two different numbers should not equal each other
test.test(
  "assertEquals - 1 doesn't equals 2 - red",
  () => test.assertEquals(1, 2)
);

// assertEquals - a string and a number should not be equal
test.test(
  "assertEquals - 1 should not equal '1'",
  () => test.assertEquals('1', 1)
);

// assertEquals - Two equal strings should return true
test.test(
  "assertEquals - 'hello' equals 'hello'",
  () => test.assertEquals("hello", "hello")
);

// assertEquals - Two unequal strings should return false
test.test("assertEquals - 'Hello' doesn't equal 'hello' - red", () => {
  test.assertEquals("Hello", "hello");
});

// assertEquals - Two different objects should not equal each other
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

// assertEquals - The same array should equal itself
test.test(
  "assertEquals - The same array should equal itself", () => {
    let array = new Array();
    let pointer = array;
    return test.assertEquals(array, pointer);
  }
);

// assertEquals - undefined should not equal null
test.test(
  "assertEquals - undefined should not equal null",
  () => {
    return test.assertEquals(undefined, null);
  }
);

// assertEquals - undefined should equal undefined
test.test("assertEquals - undefined should equal undefined", () => {
  return test.assertEquals(undefined, undefined);
});

// assertEquals - a function value should not equal another function value
test.test(
  "assertEquals - a function value should not equal another function value",
  () => test.assertEquals(function() {}, function() {})
);

// assertEquals - a function value should equal itself
test.test("assertEquals - a function value should equal itself", () => {
  let func = function() {};
  let pointer = func;
  return test.assertEquals(func, pointer);
});

//  assertDeepEquals - A number should equal itself
test.test("assertDeepEquals - 1 equals 1", () => test.assertDeepEquals(1, 1));

// // assertDeepEquals - Two different numbers should not equal each other
test.test(
  "assertDeepEquals - 1 doesn't equals 2 - red",
  () => test.assertDeepEquals(1, 2)
);

// // assertDeepEquals - a string and a number should not be equal
test.test(
  "assertDeepEquals - 1 should not equal '1'",
  () => test.assertDeepEquals('1', 1)
);

// // assertDeepEquals - Two equal strings should return true
test.test(
  "assertDeepEquals - 'hello' equals 'hello'",
  () => test.assertDeepEquals("hello", "hello")
);

// // assertDeepEquals - Two unequal strings should return false
test.test("assertDeepEquals - 'Hello' doesn't equal 'hello' - red", () => {
  test.assertDeepEquals("Hello", "hello");
});

// // assertDeepEquals - Two different objects should not equal each other if
// // they have different properties.
// test.test(
//   "assertDeepEquals - two different objects should not be equal if they have" +
//   " different properties",
//   () => test.assertDeepEquals({a: 1}, {a: 2})
// );

// // assertDeepEquals - Two different objects should equal each other if they
// // have the same properties and values
// test.test(
//   "assertDeepEquals - two different objects should be equal if they have" +
//   " the same properties and values",
//   () => test.assertDeepEquals({a: 1, b: 2}, {a: 1, b: 2})
// );

// // assertDeepEquals - the same object should equal each other
// test.test("assertDeepEquals - The same object should equal itself", () => {
//   let obj = Object.create(null);
//   let pointer = obj;
//   return test.assertDeepEquals(obj, pointer);
// });

// // assertDeepEquals - An array should not equal an object
// test.test(
//   "assertDeepEquals - An array should not equal an object - red",
//   () => test.assertDeepEquals([], {})
// );

// // assertDeepEquals - An array should not equal another array
// test.test(
//   "assertDeepEquals - an array should not equal another array - red",
//   () => test.assertDeepEquals([], [])
// );

// // assertDeepEquals - The same array should equal itself
// test.test(
//   "assertDeepEquals - The same array should equal itself", () => {
//     let array = new Array();
//     let pointer = array;
//     return test.assertDeepEquals(array, pointer);
//   }
// );

// // assertDeepEquals - undefined should not equal null
// test.test(
//   "assertDeepEquals - undefined should not equal null",
//   () => {
//     return test.assertDeepEquals(undefined, null);
//   }
// );

// // assertDeepEquals - undefined should equal undefined
// test.test("assertDeepEquals - undefined should equal undefined", () => {
//   return test.assertEquals(undefined, undefined);
// });

// // assertDeepEquals - a function value should not equal another function value
// test.test(
//   "assertDeepEquals - a function value should not equal another function value",
//   () => test.assertDeepEquals(function() {}, function() {})
// );

// // assertDeepEquals - a function value should equal itself
// test.test("assertDeepEquals - a function value should equal itself", () => {
//   let func = function() {};
//   let pointer = func;
//   return test.assertDeepEquals(func, pointer);
// });