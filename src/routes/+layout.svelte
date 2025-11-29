<script lang="ts">
	import '../app.css';
	import CustomCursorComponent from '$lib/ui-elements/cursor.svelte';
	import SnowflakesComponent from '$lib/ui-elements/snowflakes.svelte';
	import BottomOverlayComponent from '$lib/ui-elements/bottom-overlay.svelte';

	let { children } = $props();
</script>

<CustomCursorComponent />
<main>
	{@render children()}
</main>
<SnowflakesComponent />
<BottomOverlayComponent />
