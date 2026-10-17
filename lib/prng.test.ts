import { describe, expect, test } from 'bun:test';

import { mulberry32 } from './prng';

describe('mulberry32', () => {
  test('reproduces a session sequence from its seed', () => {
    const first = mulberry32(42);
    const second = mulberry32(42);
    const other = mulberry32(43);
    const sequence = Array.from({ length: 100 }, () => first());

    expect(sequence).toEqual(Array.from({ length: 100 }, () => second()));
    expect(sequence).not.toEqual(Array.from({ length: 100 }, () => other()));
    expect(new Set(sequence).size).toBeGreaterThan(1);
  });

  test.each([0, 1, -1, 0xffffffff])('seed %i produces finite values in [0, 1)', seed => {
    const random = mulberry32(seed);
    for (let index = 0; index < 1000; index++) {
      const value = random();
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
