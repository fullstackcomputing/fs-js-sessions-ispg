const emailValidator = require('./emailValidator');

test("email validator case 1", () => {
  // Arrange
  const input = "abc@123.com";
  const expected = true;
  // Act
  const actual = emailValidator(input);
  // Assert
  expect(actual).toBe(expected);
});

describe('Email Validator', () => {
  test("case 1", () => {
    // Arrange
    const input = "abc@123.com";
    const expected = true;
    // Act
    const actual = emailValidator(input);
    // Assert
    expect(actual).toBe(expected);
  });

  // multiple cases
  // Arrange
  const cases = [
    ['1@abc.com', true],
    ['', false],
    ['123@abc', false],
  ];
  test.each(cases)('case (%p %p)', (input, expected) => {
    // Act and Assert
    expect(emailValidator(input)).toBe(expected);
  });
  
});
