<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			x = event.clientX;
			y = event.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div class="cursor" style="transform: translate({x}px, {y}px);">
	<i class="fa-solid fa-arrow-pointer scale-150 text-white"></i>
</div>

<style>
	.cursor {
		position: fixed;
		pointer-events: none; /* Prevent cursor from interfering with clicks */
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
</style>
