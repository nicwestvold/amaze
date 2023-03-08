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
	];
	cases.forEach((t) => {
		it(t.description, () => {
			const result = getPrimes(t.n);

			expect(result).toStrictEqual(t.expected);
		});
	});
});
