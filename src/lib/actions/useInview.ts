export const inView = (
	node: HTMLElement,
	{ threshold = 0.2, onChange }: { threshold?: number; onChange: (visible: boolean) => void }
) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				onChange(entry.isIntersecting);
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
