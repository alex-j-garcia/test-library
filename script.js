"use strict";

let test = Object.create(null);

test.test = (string, cb) => {
  let isPass = cb();
  test.showResult(isPass, string);
  test.scrollToLast();
};

test.assertEquals = (actual, expected) => {
  if (typeof actual != typeof expected) return false;
  else return actual === expected;
};

test.assertDeepEquals = (actual, expected) => { // ['a'] ['a']
  if (actual === expected) {
    return true;
  } else if (typeof actual != typeof expected) {
    return false;
  } else if (actual === null || expected === null) {
    return false;
  } else if (typeof actual != "object" || typeof expected != "object") {
    return false;
  } else if (Object.getPrototypeOf(actual) != Object.getPrototypeOf(expected)) {
    return false;
  }

  let keys1 = Object.keys(actual), keys2 = Object.keys(expected);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!test.assertDeepEquals(actual[key], expected[key])) return false;
  }
  return true;
};

/*
 * ----------------------
 * DOM Manipulation
 * ----------------------
 */
test.showResult = (passed, test) => {
  let container = document.querySelector("#content");
  let div = document.createElement("div");
  div.style.backgroundColor = passed ? "green" : "red";
  div.textContent = test;
  container.appendChild(div);
};

test.scrollToLast = () => {
  let tests = document.querySelectorAll("#content > div");
  let last = tests[tests.length - 1];
  last.scrollIntoView(false);
};

/*
 * ---------------------
 * Tests
 * ---------------------
 */

// Should add a fail to DOM
test.test("Failures should be red - red", () => false);

// Should add a pass to the DOM
test.test("Passed tests should be green - green", () => true);

// [assertEquals] A number should equal itself
test.test("[assertEquals] 1 equals 1 - green", () => test.assertEquals(1, 1));

// [assertEquals] Two different numbers should not equal each other
test.test(
  "[assertEquals] 1 doesn't equals 2 - red",
  () => test.assertEquals(1, 2)
);

// [assertEquals] a string and a number should not be equal
test.test(
  "[assertEquals] 1 should not equal '1' - red",
  () => test.assertEquals('1', 1)
);

// [assertEquals] Two equal strings should return true
test.test(
  "[assertEquals] 'hello' equals 'hello' - green",
  () => test.assertEquals("hello", "hello")
);

// [assertEquals] Two unequal strings should return false
test.test("[assertEquals] 'Hello' doesn't equal 'hello' - red", () => {
  return test.assertEquals("Hello", "hello");
});

// [assertEquals] Two different objects should not equal each other
test.test(
  "[assertEquals] two different objects should not be equal - red",
  () => test.assertEquals({}, {})
);

// [assertEquals] the same object should equal each other
test.test("[assertEquals] The same object should equal itself - green", () => {
  let obj = Object.create(null);
  let pointer = obj;
  return test.assertEquals(obj, pointer);
});

// [assertEquals] An array should not equal an object
test.test(
  "[assertEquals] An array should not equal an object - red",
  () => test.assertEquals([], {})
);

// [assertEquals] An array should not equal another array
test.test(
  "[assertEquals] an array should not equal another array - red",
  () => test.assertEquals([], [])
);

// [assertEquals] The same array should equal itself
test.test(
  "[assertEquals] The same array should equal itself - green", () => {
    let array = new Array();
    let pointer = array;
    return test.assertEquals(array, pointer);
  }
);

// [assertEquals] undefined should not equal null
test.test(
  "[assertEquals] undefined should not equal null - red",
  () => {
    return test.assertEquals(undefined, null);
  }
);

// [assertEquals] undefined should equal undefined
test.test("[assertEquals] undefined should equal undefined - green", () => {
  return test.assertEquals(undefined, undefined);
});

// [assertEquals] a function value should not equal another function value
test.test(
  "[assertEquals] a function value should not equal another function value -" +
  " red",
  () => test.assertEquals(function() {}, function() {})
);

// [assertEquals] a function value should equal itself
test.test("[assertEquals] a function value should equal itself -" +
" green",
() => {
  let func = function() {};
  let pointer = func;
  return test.assertEquals(func, pointer);
});

//  [assertDeepEquals] A number should equal itself
test.test(
  "[assertDeepEquals] 1 equals 1 - green",
  () => test.assertDeepEquals(1, 1)
);

// [assertDeepEquals] Two different numbers should not equal each other
test.test(
  "[assertDeepEquals] 1 doesn't equal 2 - red",
  () => test.assertDeepEquals(1, 2)
);

// [assertDeepEquals] a string and a number should not be equal
test.test(
  "[assertDeepEquals] 1 should not equal '1' - red",
  () => test.assertDeepEquals('1', 1)
);

// [assertDeepEquals] Two equal strings should return true
test.test(
  "[assertDeepEquals] 'hello' equals 'hello' - green",
  () => test.assertDeepEquals("hello", "hello")
);

// [assertDeepEquals] Two unequal strings should return false
test.test("[assertDeepEquals] 'Hello' doesn't equal 'hello' - red", () => {
  return test.assertDeepEquals("Hello", "hello");
});

// [assertDeepEquals] Two different objects should not equal each other if
// they have different properties.
test.test(
  "[assertDeepEquals] two different objects should not be equal if they have" +
  " different properties - red",
  () => test.assertDeepEquals({a: 1}, {a: 2})
);

// [assertDeepEquals] Two different objects should equal each other if they
// have the same properties and values
test.test(
  "[assertDeepEquals] two different objects should be equal if they have" +
  " the same properties and values - green",
  () => {
    let test1 = test.assertDeepEquals({a: 1, b: 2}, {a: 1, b: 2});
    let test2 = test.assertDeepEquals(
      {a: 'a', b: [1, 2, 3]},
      {a: 'a', b: [1, 2, 3]}
    );
    let test3 = test.assertDeepEquals(
      {a: 'a', b: {a: 1, b: 'c'}},
      {a: 'a', b: {a: 1, b: 'c'}}
    );
    return test1 && test2 && test3;
  }
);

// [assertDeepEquals] the same object should equal each other
test.test("[assertDeepEquals] The same object should equal itself - green", () => {
  let obj = Object.create(null);
  let pointer = obj;
  return test.assertDeepEquals(obj, pointer);
});

// [assertDeepEquals] An array should not equal an object
test.test(
  "[assertDeepEquals] An array should not equal an object - red",
  () => test.assertDeepEquals([], {})
);

// [assertDeepEquals] An array should not equal another array with different
// properties
test.test(
  "[assertDeepEquals] an array should not equal another array with different" +
  " properties - red",
  () => {
    let test1 = test.assertDeepEquals(['a'], ['b']);
    let test2 = test.assertDeepEquals([1, 2, 3], [1, 2]);
    return test1 && test2;
  }
);

// [assertDeepEquals] An array should equal another array with identical
// properties
test.test(
  "[assertDeepEquals] an array should equal another array with identical" +
  " properties - green",
  () => {
    let test1 = test.assertDeepEquals(['a'], ['a']);
    let test2 = test.assertDeepEquals([1, 2, 3], [1, 2, 3]);
    return test1 && test2;
  }
);

// [assertDeepEquals] The same array should equal itself
test.test(
  "[assertDeepEquals] The same array should equal itself - green", () => {
    let array = new Array();
    let pointer = array;
    return test.assertDeepEquals(array, pointer);
  }
);

// [assertDeepEquals] undefined should not equal null
test.test(
  "[assertDeepEquals] undefined should not equal null - red",
  () => test.assertDeepEquals(undefined, null)
);

// [assertDeepEquals] undefined should equal undefined
test.test(
  "[assertDeepEquals] undefined should equal undefined - green",
  () => test.assertEquals(undefined, undefined)
);

// [assertDeepEquals] a function value should not equal another function value
test.test(
  "[assertDeepEquals] a function value should not equal another function " +
  "value - red",
  () => test.assertDeepEquals(function() {}, function() {})
);

// [assertDeepEquals] a function value should equal itself
test.test(
  "[assertDeepEquals] a function value should equal itself - green",
  () => {
    let func = function() {};
    let pointer = func;
    return test.assertDeepEquals(func, pointer);
  }
);
