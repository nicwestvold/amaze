import { afterEach, describe, expect, it, vi } from 'vitest';
import { cli } from './cli';
import { buildMultiTable } from './buildMultiTable.js';
import { getPrimes } from './getPrimes.js';

vi.mock('./getPrimes.js', () => {
	return {
		getPrimes: vi.fn(),
	};
});
vi.mock('./buildMultiTable.js', () => {
	return {
		buildMultiTable: vi.fn(),
	};
});

describe('cli', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const errorCases = [
		{
			description: 'should throw an error, given no arguments',
			args: undefined,
			error: 'Must provide number of primes to calculate.',
		},
		{
			description: 'should throw an error, given a non-integer input',
			args: ['asdf'],
			error: 'Must provide a positive integer.',
		},
		{
			description: 'should throw an error, given more than one argument',
			args: ['10', 'asdf'],
			error: 'Invalid number of arguments. Only one number permitted.',
		},
		{
			description:
				'should throw an error, given a string that begins with a number',
			args: ['8b'],
			error: 'Must provide a positive integer.',
		},
	];

	errorCases.forEach((t) => {
		it(t.description, () => {
			expect(() => cli(t.args)).toThrowError(t.error);
		});
	});

	it('should call getPrimes', () => {
		const count = 10;

		cli([`${count}`]);

		expect(getPrimes).toHaveBeenCalledWith(10);
	});

	it('should call getPrimes', () => {
		const count = 10;
		const response = [2];

		getPrimes.mockReturnValue(response);

		cli([`${count}`]);

		expect(buildMultiTable).toHaveBeenCalledWith(response);
	});
});
