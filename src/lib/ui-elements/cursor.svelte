<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(600);
	let y = $state(500);
	onMount(() => {
		const mouse = JSON.parse(localStorage.getItem('mouseClient') as string) || {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		};

		x = mouse.x;
		y = mouse.y;
			localStorage.setItem('mouseClient', JSON.stringify({x, y}));

		const handleMouseMove = (event: MouseEvent) => {
			x = event.clientX;
			y = event.clientY;
			const mouseClient = {
				x: event.clientX,
				y: event.clientY
			};
			localStorage.setItem('mouseClient', JSON.stringify(mouseClient));
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div class="cursor" style="transform: translate({x}px, {y}px);">
	<i class="fa-solid fa-arrow-pointer text-3xl text-white"></i>
</div>

<style>
	.cursor {
		position: fixed;
		pointer-events: none; /* Prevent cursor from interfering with clicks */
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
</style>
