/**
 * Serializes all the first level values to JSON
 * @param {Object} query - Query object
 * @returns {Object}
 */
export default function stringifyValues (query) {
	let queryParams = {};

	if (query) {
		Object.keys(query).forEach(function (key) {
			let value = query[key];

			if (typeof value === 'object') {
				queryParams[key] = JSON.stringify(value);
			}
			else {
				queryParams[key] = value;
			}
		});
	}
	return queryParams;
}