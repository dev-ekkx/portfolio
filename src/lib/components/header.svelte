<script lang="ts">
	import Logo from '$lib/ui-elements/logo.svelte';
	import navLinks from '$lib/data/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let isScrolled = $state(false);
	let activeLink = $state(page.url.pathname);

	$effect(() => {
		console.log('Header scrolled:', isScrolled);
	});

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 0;
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="g-px sticky top-0 z-50 flex items-center justify-between border-2 backdrop-blur-xs">
	<Logo />

	<nav>
		<ul class="flex items-center gap-5">
			{#each navLinks as link (link.route)}
				<li>
					<a href={link.route} class="text-lg font-semibold text-white hover:underline"
						>{link.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
