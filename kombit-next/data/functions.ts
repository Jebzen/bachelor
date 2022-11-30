export function WPStringToTime(string: string) {
	return `${string.substring(0, 4)}-${string.substring(
		4,
		6
	)}-${string.substring(6, 8)}`;
}
