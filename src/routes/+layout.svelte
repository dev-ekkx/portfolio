<script lang="ts">
	import '../app.css';
	import CustomCursor from '$lib/ui-elements/cursor.svelte';
	import Snowflakes from '$lib/ui-elements/snowflakes.svelte';
	import Header from '$lib/components/header.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	console.log(browser);
</script>

{#if browser}
	<CustomCursor />
{/if}
<Header />
{@render children()}
<Snowflakes />
