export function createMultiObserver(
	callback: (entries: IntersectionObserverEntry[]) => void,
	options?: IntersectionObserverInit
) {
	return new IntersectionObserver(callback, {
		threshold: 0.1,
		rootMargin: '50px',
		...options
	});
}
