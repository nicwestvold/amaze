import { expect, describe, it } from 'vitest';
import { getPrimes } from './getPrimes';

describe('getPrimes', () => {
	const cases = [
		{
			description: 'should return empty list, given 0',
			n: 0,
			expected: [],
		},
		{
			description: 'should return empty list, given undefined count',
			n: undefined,
			expected: [],
		},
		{
			description: 'should return empty list, given null count',
			n: null,
			expected: [],
		},
		{
			description: 'should return first 4 primes',
			n: 4,
			expected: [2, 3, 5, 7],
		},
	];
	cases.forEach((t) => {
		it(t.description, () => {
			const result = getPrimes(t.n);

			expect(result).toStrictEqual(t.expected);
		});
	});
});
