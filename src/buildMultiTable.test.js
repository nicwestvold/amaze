import { describe, expect, it } from 'vitest';
import { buildMultiTable } from './buildMultiTable';

describe('buildMultiTable', () => {
	it('should throw error, given string in the list', () => {
		expect(() => buildMultiTable(['asdf'])).toThrowError(
			'Must provide a list of positive integers.',
		);
	});

	it('should throw error, given negative number in the list', () => {
		expect(() => buildMultiTable([2, 3, -1])).toThrowError(
			'Must provide a list of positive integers.',
		);
	});

	const cases = [
		{
			description: '',
			list: [2, 3, 5],
			expected: {
				2: { 2: 4, 3: 6, 5: 10 },
				3: { 2: 6, 3: 9, 5: 15 },
				5: { 2: 10, 3: 15, 5: 25 },
			},
		},
	];

	cases.forEach((t) => {
		it(t.description, () => {
			const result = buildMultiTable(t.list);

			expect(result).toStrictEqual(t.expected);
		});
	});
});
