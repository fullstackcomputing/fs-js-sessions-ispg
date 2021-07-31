const findNestedObjectValue = require('./findNestedObjectValue');

describe('findNestedObjectValue', () => {
  // Arrange
  const userData = {
    id: 1,
    profile: {
      fbId: '123',
      karma: {
        reviews: 100,
        rating: 4.5
      }
    }
  };

  const cases = [
    [[userData, ['id']], 1],
    [[userData, ['profile', 'fbId']], '123' ],
    [[userData, ['profile', 'karma', 'rating']], 4.5 ],
    [[userData, ['']], undefined],
    [[undefined, ['']], undefined],
  ];

  test.each(cases)('case (%p %p)', (input, expected) => {
    // Act and Assert
    expect(findNestedObjectValue(input[0], input[1])).toBe(expected);
  });


});