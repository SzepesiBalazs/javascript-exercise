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

import SubscriptionPlan from "../src/priceCalculator.js";

test("Price should be more than zero.", () => {
  const somePlan = new SubscriptionPlan([10], "Some Name", "uuid");
  expect(somePlan.calculatePrice()).toBeGreaterThan(0);
});

test("Price should only contain number", () => {
  const somePlan = new SubscriptionPlan(["asddf"], "Some Name", "uuid");
  expect(() => somePlan.calculatePrice()).toThrow(
    "Invalid price. Price must be a positive number.",
  );
});

test("Price should have only 2 decimals", () => {
  const somePlan = new SubscriptionPlan([10.00], "Some Name", "uuid");
  expect(somePlan.calculatePrice().toString()).toMatch(/^\d+(.\d{2})?$/);
});

test("Price should change based on the tier it has", () => {
  const somePlan = new SubscriptionPlan(
    [10.0, 20.45, 38.99],
    "Some Name",
    "uuid",
  );
  expect(somePlan.calculatePrice(1, 0.26899)).toBeCloseTo(7.3101);
  expect(somePlan.calculatePrice(2)).toBeCloseTo(20.45);
  expect(somePlan.calculatePrice(3)).toBeCloseTo(38.99);
});

test("If tier is less than zero, it should throw an error.", () => {
  const somePlan = new SubscriptionPlan([10], "Some Name", "uuid");
  expect(() => somePlan.calculatePrice(0)).toThrow(
    "Invalid price. Price must be a positive number.",
  );
});
