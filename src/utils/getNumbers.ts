export const getShortNumber = (number: number) => {
	if (number < 1000) return number;
	if (number < 1_000_000) return `${(number / 1000).toFixed(1)}K`;
	return `${(number / 1_000_000).toFixed(1)}M`;
};
