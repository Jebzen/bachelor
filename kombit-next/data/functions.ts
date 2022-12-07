export function WPStringToTime(string: string) {
	console.log(string);
	return `${string.substring(0, 3)}-${string.substring(
		3,
		6
	)}-${string.substring(6, 8)}`;
}
