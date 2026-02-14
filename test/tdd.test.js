// import validatePassword from '../src/passwordValidator.js';

// test('rejects passwords shorter than 8 characters', () => {
//   expect(validatePassword('abc')).toBe(false);
// });

// test('accepts passwords with at least 1 number', () => {
//   expect(validatePassword('abcde1Fgh')).toBe(true);
//   expect(validatePassword('abcdefgh')).toBe(false);
// });

// test('requires at least one uppercase letter', () => {
//   expect(validatePassword('abcde1Fgh')).toBe(true);
//   expect(validatePassword('abcd1fg')).toBe(false);
// });
//

import calculatePlan from '../src/priceCalculator.js';


// Part 1 - Base Monthly Subscription Price

test("Basic plans monthly cost should be 10", () => {
  expect(calculatePlan("basic")).toEqual(10);
});

test("If plan name is invalid, it should return undefined", () => {
  expect(calculatePlan("aaa")).toBeUndefined();
});

// Part 2 - Multiple Subscription Plans

test("Support simple plans with fixed monthly cost", () => {
  expect(calculatePlan("basic")).toEqual(10);
  expect(calculatePlan("pro")).toEqual(20);
  expect(calculatePlan("enterprise")).toEqual(30);
});

// Part 3 - Billing Period Calculation

test("Calculate cost for multiple billing months", () => {
  expect(calculatePlan("basic", 3)).toEqual(30);
  expect(calculatePlan("pro", 6)).toEqual(120);
  expect(calculatePlan("enterprise", 12)).toEqual(360);
});

test("If number of months is invalid, it should return undefined", () => {
  expect(calculatePlan("basic", -1)).toBeUndefined();
  expect(calculatePlan("pro", "three")).toBeUndefined();
  expect(calculatePlan("enterprise", null)).toBeUndefined();
});

test("Ensure correct multiplication of monthly cost", () => {
  expect(calculatePlan("basic", 3)).toEqual(calculatePlan("basic", 1) * 3);
  expect(calculatePlan("pro", 6)).toEqual(calculatePlan("pro", 1) * 6);
  expect(calculatePlan("enterprise", 12)).toEqual(calculatePlan("enterprise", 1) * 12);
});

// Part 4 - Discounts

/*
We should support these codes:
- "10percent": 10% off the total price
- "25percernt" : 25% off the total price
- "50percent" : 50% off the total price
*/
test("Apply percentage discount codes", () => {
  expect(calculatePlan("basic", 3, ["10percent"])).toEqual(calculatePlan("basic", 3) * (1 - 0.1));
  expect(calculatePlan("pro", 6, ["25percent"])).toEqual(calculatePlan("pro", 6) * (1 - 0.25));
  expect(calculatePlan("enterprise", 12, ["50percent"])).toEqual(calculatePlan("enterprise", 12) * (1 - 0.5));
});

/*
We should also support these fixed discount codes:
- "5off": $5 off the total price
- "10off": $10 off the total price
- "20off": $20 off the total price
*/
test("Apply fixed discount codes", () => {
  expect(calculatePlan("basic", 3, [], ["5off"])).toEqual(calculatePlan("basic", 3) - 5);
  expect(calculatePlan("pro", 6, [], ["10off"])).toEqual(calculatePlan("pro", 6) - 10);
  expect(calculatePlan("enterprise", 12, [], ["20off"])).toEqual(calculatePlan("enterprise", 12) - 20);
});

test("Amount should never go below zero", () => {
  expect(calculatePlan("basic", 1, [], ["20off"])).toEqual(0);
});

test("Amount should never go below zero", () => {
  expect(calculatePlan("basic", 1, [], ["20off"])).toEqual(0);
});

test("Multiple discount codes should work together", () => {
  expect(calculatePlan("basic", 3, [], ["5off", "5off"])).toEqual(calculatePlan("basic", 3) - 5 - 5);
});
