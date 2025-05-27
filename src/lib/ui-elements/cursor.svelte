<script lang="ts">
	import { onMount } from 'svelte';

	let isLinkElement = $state(false);

	let x = $state(600);
	let y = $state(500);
	onMount(() => {
		const mouse = JSON.parse(localStorage.getItem('mouseClient') as string) || {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		};

		x = mouse.x;
		y = mouse.y;
		localStorage.setItem('mouseClient', JSON.stringify({ x, y }));

		const handleMouseMove = (event: MouseEvent) => {
			x = event.clientX;
			y = event.clientY;
			const mouseClient = {
				x: event.clientX,
				y: event.clientY
			};
			localStorage.setItem('mouseClient', JSON.stringify(mouseClient));

			// Check if a hovered element is a button or link
			const target = event.target as HTMLElement;

			isLinkElement = target.tagName === 'BUTTON' || target.tagName === 'A';
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div class="cursor text-3xl" style="transform: translate({x}px, {y}px);">
	{#if isLinkElement}
		<span>
			<i class="fa-solid fa-hand-pointer"></i>
		</span>
	{:else}
		<span>
			<i class="fa-solid fa-arrow-pointer"></i>
		</span>
	{/if}
</div>

<style>
	.cursor {
		color: white;
		position: fixed;
		pointer-events: none; /* Prevent cursor from interfering with clicks */
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
</style>
