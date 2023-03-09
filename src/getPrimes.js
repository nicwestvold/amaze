/**
 * Get the first `n` prime numbers
 */
export const getPrimes = (count) => {
	const primes = [];
	if (!count) return primes;

	let start = 2;
	let stop = findN(count);
	const sieve = populateSieve(start, stop);

	while (count > primes.length) {
		sieveOfEratosthenes(start, stop, count, sieve, primes);
		if (count > primes.length) {
			const diff = stop - start;
			start = stop + 1;
			stop = start + diff;
			populateSieve(start, stop, sieve);
			markSieve(stop, sieve, primes);
		}
	}

	return primes.slice(0, count);
};

function sieveOfEratosthenes(start, stop, count, sieve, primes) {
	for (let i = start; i <= stop; i++) {
		if (sieve[i]) {
			primes.push(i);
			if (primes.length === count) return primes;
			for (let j = i * i; j <= stop; j += i) {
				sieve[j] = false;
			}
		}
		// clean up
		delete sieve[i];
	}
	return primes;
}

/**
 * Encapsulates the logic of finding an appropriate `n`
 */
function findN(count) {
	if (count <= 4) {
		return count * 2;
	}
	return Math.ceil(count * Math.log(count));
}

/**
 * use an object as the sieve
 */
function populateSieve(start, stop, sieve = { length: 0 }) {
	sieve.length += stop + 1;
	for (let i = start; i <= stop; i++) {
		sieve[i] = true;
	}
	return sieve;
}

/**
 * marks a sieve's values as false, given an array of primes.
 */
function markSieve(stop, sieve, primes) {
	for (let i = 0; i < primes.length; i++) {
		const p = primes[i];
		for (let j = p * p; j <= stop; j += p) {
			if (sieve[j]) {
				sieve[j] = false;
			}
		}
	}
}
