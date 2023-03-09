export const buildMultiTable = (list) => {
	if (!list || !Array.isArray(list) || !list.every(isPositiveInteger)) {
		throw Error('Must provide a list of positive integers.');
	}
	return list.reduce((acc, curr) => {
		acc[curr] = list.reduce((a, c) => {
			a[c] = curr * c;
			return a;
		}, {});
		return acc;
	}, {});
};

function isPositiveInteger(el) {
	const n = Number(el);
	return Number.isInteger(n) && n > 0;
}
