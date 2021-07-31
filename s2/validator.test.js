const validator = require('./validator');

describe('Email Validator', () => {
  // multiple cases
  // Arrange
  const cases = [
    ['1@abc.com', true],
    ['', false],
    ['123@abc', false],
  ];
  test.each(cases)('case (%p %p)', (input, expected) => {
    // Act and Assert
    expect(validator.email(input)).toBe(expected);
  });
});

describe('Username Validator', () => {
  // multiple cases
  // Arrange
  const cases = [
    ['123.foo', true],
    ['abc123_wew-12d', true],
    ['', false],
    ['123@abc', false],
  ];
  test.each(cases)('case (%p %p)', (input, expected) => {
    // Act and Assert
    expect(validator.username(input)).toBe(expected);
  });
});