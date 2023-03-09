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
			error: 'Must provide a positive integer. Provided: asdf',
		},
		{
			description: 'should throw an error, given a zero value input',
			args: ['0'],
			error: 'Must provide a positive integer. Provided: 0',
		},
		{
			description: 'should throw an error, given a negative value input',
			args: ['-10'],
			error: 'Must provide a positive integer. Provided: -10',
		},
		{
			description: 'should throw an error, given more than one argument',
			args: ['10', 'asdf'],
			error:
				'Invalid number of arguments. Only one number permitted. args: 10, asdf',
		},
		{
			description:
				'should throw an error, given a string that begins with a number',
			args: ['8b'],
			error: 'Must provide a positive integer. Provided: 8b',
		},
	];

	errorCases.forEach((t) => {
		it(t.description, () => {
			const spy = vi.spyOn(console, 'error');

			cli(t.args);

			expect(spy).toHaveBeenCalledWith(t.error);
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
