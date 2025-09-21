export type Options = {
	speed: number;
	delay: number;
	onComplete?: () => void;
};

export const typewriter = (
	node: HTMLElement,
	{ speed = 1, delay = 0, onComplete }: Partial<Options> = {}
) => {
	const text = node.textContent ?? '';
	let timeoutId: ReturnType<typeof setTimeout>;
	let intervalId: ReturnType<typeof setInterval>;
	let currentIndex = 0;

	const startTypewriting = () => {
		node.textContent = '';
		currentIndex = 0;

		const typeNextChar = () => {
			if (currentIndex < text.length) {
				node.textContent = text.slice(0, currentIndex + 1);
				currentIndex++;
			} else {
				clearInterval(intervalId);
				onComplete?.();
			}
		};

		intervalId = setInterval(typeNextChar, 1000 / (speed * 10));
	};

	timeoutId = setTimeout(startTypewriting, delay);

	return {
		destroy() {
			clearTimeout(timeoutId);
			clearInterval(intervalId);
		},
		update(newOptions: Partial<Options>) {
			clearTimeout(timeoutId);
			clearInterval(intervalId);

			const options = { speed: speed, delay: delay, onComplete, ...newOptions };
			timeoutId = setTimeout(() => {
				node.textContent = '';
				currentIndex = 0;

				const typeNextChar = () => {
					if (currentIndex < text.length) {
						node.textContent = text.slice(0, currentIndex + 1);
						currentIndex++;
					} else {
						clearInterval(intervalId);
						options.onComplete?.();
					}
				};

				intervalId = setInterval(typeNextChar, 1000 / (options.speed * 10));
			}, options.delay);
		}
	};
};
