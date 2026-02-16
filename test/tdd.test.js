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

import calculatePlan from "../src/priceCalculator.js";
import PriceCalculator from "../src/priceCalculator.js";

// Part 1 - Base Monthly Subscription Price

test("Basic plans monthly cost should be 10", () => {
  expect(calculatePlan("basic")).toEqual(10);
});

test("If plan name is invalid, it should return undefined", () => {
  expect(calculatePlan("aaa")).toBeUndefined();
});

// Part 2 - Multiple Subscription Plans

test.each([
  ["basic", 10],
  ["pro", 20],
  ["enterprise", 30],
])("Support simple plans with fixed monthly cost", (price, expected) => {
  expect(calculatePlan(price)).toEqual(expected);
});

// Part 3 - Billing Period Calculation

test.each([
  ["basic", 3, 30],
  ["pro", 6, 120],
  ["enterprise", 12, 360],
])("Calculate cost for multiple billing months", (plan, months, expected) => {
  expect(calculatePlan(plan, months)).toEqual(expected);
});

test.each([
  ["basic", -1],
  ["pro", "three"],
  ["enterprise", null],
])(
  "If number of months is invalid, it should return undefined",
  (plan, months) => {
    expect(calculatePlan(plan, months)).toBeUndefined();
  },
);

test.each([
  ["basic", 3],
  ["pro", 6],
  ["enterprise", 12],
])("Ensure correct multiplication of monthly cost", (plan, months) => {
  expect(calculatePlan(plan, months)).toEqual(calculatePlan(plan, 1) * months);
});

// Part 4 - Discounts

/*
We should support these codes:
- "10percent": 10% off the total price
- "25percernt" : 25% off the total price
- "50percent" : 50% off the total price
*/

test.each([
  ["basic", 3, ["10percent"], 0.1],
  ["pro", 6, ["25percent"], 0.25],
  ["enterprise", 12, ["50percent"], 0.5],
])(
  "Apply percentage discount codes",
  (plan, months, discountCodes, discount) => {
    expect(calculatePlan(plan, months, discountCodes)).toBe(
      calculatePlan(plan, months) * (1 - discount),
    );
  },
);

/*
We should also support these fixed discount codes:
- "5off": $5 off the total price
- "10off": $10 off the total price
- "20off": $20 off the total price
*/

//create data sets/data providers for the expectations, in a way we can simplify the tests. (all of them)

test.each([
  ["basic", 3, [], ["5off"]],
  ["pro", 6, [], ["10off"]],
  ["enterprise", 12, [], ["20off"]],
])(
  "Apply fixed discount codes",
  (plan, months, discountPercentageCodes, discountFixedCodes) => {
    expect(
      calculatePlan(plan, months, discountPercentageCodes, discountFixedCodes),
    ).toEqual(
      calculatePlan(plan, months) - discountFixedCodes[0].replace("off", ""),
    );
  },
);

test.each([["basic", 1, [], ["20off"]]])(
  "Amount should never go below zero",
  (plan, months, discountPercentageCodes, discountFixedCodes) => {
    expect(
      calculatePlan(plan, months, discountPercentageCodes, discountFixedCodes),
    ).toEqual(0);
  },
);

test.each([["basic", 3, [], ["5off", "5off"], [5, 5]]])(
  "Multiple discount codes should work together",
  (plan, months, discountPercentageCodes, discountFixedCodes, discounts) => {
    expect(
      calculatePlan(plan, months, discountPercentageCodes, discountFixedCodes),
    ).toEqual(
      calculatePlan(plan, months) -
        discounts.reduce((acc, discount) => acc + discount, 0),
    );
  },
);

test.each([
  ["basic", 3, [], [], 0.1],
  ["pro", 6, [], [], 0.2],
  ["enterprise", 12, [], [], 0.3],
])(
  "Applying tax to the final price",
  (plan, months, discountPercentageCodes, discountFixedCodes, tax) => {
    expect(
      calculatePlan(
        plan,
        months,
        discountPercentageCodes,
        discountFixedCodes,
        tax,
      ),
    ).toEqual(
      calculatePlan(plan, months, discountPercentageCodes, discountFixedCodes) *
        (1 + tax),
    );
  },
);
