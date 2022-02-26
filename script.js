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
