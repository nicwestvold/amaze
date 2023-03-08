export const getPrimes = (count) => {
	const primes = [];
	if (!count) return primes;
	const n = 100;
	const sieve = new Array(n + 1).fill(true);

	for (let i = 2; i <= n; i++) {
		if (sieve[i]) {
			primes.push(i);
			for (let j = i * i; j <= n; j += i) {
				sieve[j] = false;
			}
		}
	}

	return primes.slice(0, count);
};
