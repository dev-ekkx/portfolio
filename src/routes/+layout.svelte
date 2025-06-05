<script lang="ts">
	import '../app.css';
	import CustomCursorComponent from '$lib/ui-elements/cursor.svelte';
	import SnowflakesComponent from '$lib/ui-elements/snowflakes.svelte';
	import HeaderComponent from '$lib/components/header.svelte';
	import BottomOverlayComponent from '$lib/ui-elements/bottom-overlay.svelte';

	let { children } = $props();
</script>

<CustomCursorComponent />
<HeaderComponent />
<main>
	{@render children()}
</main>
<SnowflakesComponent />
<BottomOverlayComponent />
