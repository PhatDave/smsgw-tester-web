const EPOCH_MILLISECONDS_MILLI = {val: 1, unit: 'ms'};
const EPOCH_SECONDS_MILLI = {val: EPOCH_MILLISECONDS_MILLI.val * 1000, unit: 's'};
const EPOCH_MINUTES_MILLI = {val: EPOCH_SECONDS_MILLI.val * 60, unit: 'm'};
const EPOCH_HOURS_MILLI = {val: EPOCH_MINUTES_MILLI.val * 60, unit: 'h'};
const EPOCH_DAYS_MILLI = {val: EPOCH_HOURS_MILLI.val * 24, unit: 'd'};
const EPOCH_WEEKS_MILLI = {val: EPOCH_DAYS_MILLI.val * 7, unit: 'w'};
const EPOCH_MONTHS_MILLI = {val: EPOCH_DAYS_MILLI.val * 30, unit: 'M'};
const EPOCH_YEARS_MILLI = {val: EPOCH_MONTHS_MILLI.val * 12, unit: 'Y'};
const EPOCH_MILLI = [EPOCH_YEARS_MILLI, EPOCH_MONTHS_MILLI, EPOCH_WEEKS_MILLI, EPOCH_DAYS_MILLI, EPOCH_HOURS_MILLI, EPOCH_MINUTES_MILLI, EPOCH_SECONDS_MILLI, EPOCH_MILLISECONDS_MILLI];

export default {
	relativizeTime(dateAdded) {
		let now = new Date().getTime();
		let addedMsAgo = now - dateAdded;

		let out = "";
		let epochMilliSubset = EPOCH_MILLI.slice(0, EPOCH_MILLI.length - 2);
		epochMilliSubset.forEach((division) => {
			if (addedMsAgo > division.val) {
				let minComplete = Math.floor(addedMsAgo / division.val);
				out += `${minComplete} ${division.unit} `;
				addedMsAgo -= minComplete * division.val;
			}
		});
		if (out === "") {
			out = `< 1${epochMilliSubset[epochMilliSubset.length - 1].unit}`;
		}
		return `${out} ago`;
	}
};
