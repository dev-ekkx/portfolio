<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Directions } from '$lib/types';
	import { inView } from '$lib/actions/useInview';

	const { direction = 'top', children } = $props<{ direction?: Directions, children: Node }>();
	let isVisible = $state(false);

	let element: HTMLElement;

	const getFly = (dir: Directions) => {
		switch (dir) {
			case 'up':
				return { x: 0, y: 50 };
			case 'down':
				return { x: 0, y: -50 };
			case 'left':
				return { x: 50, y: 0 };
			case 'right':
				return { x: -50, y: 0 };
		}
	};

	const getOpposite = (dir: Directions) => {
		switch (dir) {
			case 'up':
				return { x: 0, y: -50 };
			case 'down':
				return { x: 0, y: 50 };
			case 'left':
				return { x: -50, y: 0 };
			case 'right':
				return { x: 50, y: 0 };
		}
	};

	$effect(() => {
		const action = inView(element, {
			threshold: 0.2,
			onChange: (v) => isVisible = v
		});
		return () => action.destroy();
	});
</script>

<div
	bind:this={element}
>
	<div
		in:fly={{ ...getFly(direction), duration: 500 }}
		out:fly={{ ...getOpposite(direction), duration: 500 }}
	>
		{@render children()}
	</div>
</div>