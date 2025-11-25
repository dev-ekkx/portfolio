<script lang="ts">
	import HeroComponent from '$lib/components/hero.svelte';
	import AboutComponent from '$lib/components/about.svelte';
</script>

<svelte:head>
	<title>Emmanuel Kpendo - Software & Cloud Engineer</title>
	<meta
		content="Emmanuel Kpendo, Dela Ricch, front-end, frontend software engineer, solutions architect"
		name="description"
	/>
</svelte:head>

<div class="flex flex-col gap-[30vh] ">

	<HeroComponent />
	<AboutComponent />
</div>
<div class="h-[99vh]"></div>
