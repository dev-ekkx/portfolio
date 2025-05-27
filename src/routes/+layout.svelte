<script lang="ts">
	import '../app.css';
	import CustomCursor from '$lib/ui-elements/cursor.svelte';
	import Snowflakes from '$lib/ui-elements/snowflakes.svelte';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<CustomCursor />
<Header />
{@render children()}
<Snowflakes />
