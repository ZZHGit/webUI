/* eslint-env jest */
import sum from './index';

describe('Layout', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
