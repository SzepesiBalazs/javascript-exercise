import validatePassword from '../src/passwordValidator.js';

test('rejects passwords shorter than 8 characters', () => {
  expect(validatePassword('abc')).toBe(false);
});

test('accepts passwords with at least 1 number', () => {
  expect(validatePassword('abcde1fgh')).toBe(true);
  expect(validatePassword('abcdefgh')).toBe(false);
});
