const BASE = 32;
export default function (base = BASE) {
	return (
		new Date().getTime().toString(BASE) +
		Math.random()
			.toString(base)
			.slice(2)
	);
}
