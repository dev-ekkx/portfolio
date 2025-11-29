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
				return { x: 0, y: -50 };
			case 'down':
				return { x: 0, y: 50 };
			case 'left':
				return { x: -50, y: 0 };
			case 'right':
				return { x: 50, y: 0 };

		}
	};

	const getOpposite = (dir: Directions) => {
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

	$effect(() => {
		const action = inView(element, {
			threshold: 0.1,
			onChange: (v) => isVisible = v
		});
		return () => action.destroy();
	});
</script>

<div
	bind:this={element}
	class="border h-[40vh]"
>
	{#if isVisible}
		<!--			in:fly={{y: -500, duration: 1500}}-->
		<!--			out:fly={{y: 1000, duration: 1500}}-->
		<div
			in:fly={{ ...getFly(direction), duration: 1000 }}
			out:fly={{ ...getOpposite(direction), duration: 1000 }}
		>
			{@render children()}
		</div>
	{/if}
</div>