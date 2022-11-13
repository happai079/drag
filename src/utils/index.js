export const inrange = (move, min, max) => {
	if (move < min) return min;
	if (move > max) return max;
	return move;
};
