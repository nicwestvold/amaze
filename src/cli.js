import { buildMultiTable } from './buildMultiTable.js';
import { getPrimes } from './getPrimes.js';

export const cli = (args) => {
	if (!args || !Array.isArray(args) || !args.length) {
		throw Error('Must provide number of primes to calculate.');
	}
	if (args.length > 1) {
		throw Error(
			`Invalid number of arguments. Only one number permitted. args: ${args.join(
				', ',
			)}`,
		);
	}

	const n = Number(args[0]);

	if (isNaN(n)) {
		throw Error(`Must provide a positive integer. Provided: ${args[0]}`);
	}

	const primes = getPrimes(parseInt(n, 10));
	const table = buildMultiTable(primes);
	console.table(table);
};
