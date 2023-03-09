import { buildMultiTable } from './buildMultiTable.js';
import { getPrimes } from './getPrimes.js';

export const cli = (args) => {
	if (!args || !Array.isArray(args) || !args.length) {
		console.error('Must provide number of primes to calculate.');
		return;
	}
	if (args.length > 1) {
		console.error(
			`Invalid number of arguments. Only one number permitted. args: ${args.join(
				', ',
			)}`,
		);
		return;
	}

	const n = Number(args[0]);
	if (isNaN(n) || n <= 0) {
		console.error(`Must provide a positive integer. Provided: ${args[0]}`);
		return;
	}

	const primes = getPrimes(parseInt(n, 10));
	const table = buildMultiTable(primes);
	console.table(table);
};
