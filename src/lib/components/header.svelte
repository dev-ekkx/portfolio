<script lang="ts">
	import Logo from '$lib/ui-elements/logo.svelte';
	import navLinks from '$lib/data/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let headerElement: HTMLElement;
	let isScrolled = $state(false);
	let activeLink = $state(page.url.pathname);


	onMount(() => {
		const handleScroll = () => {
			if (headerElement) {
				isScrolled = window.scrollY > headerElement.offsetHeight;
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	bind:this={headerElement}
	class={cn("g-px sticky top-0 z-50 flex items-center justify-between border-2 transition-all duration-200 ease-linear", {
		'backdrop-blur-xs': isScrolled,
	})}>
	<Logo />

	<nav>
		<ul class="flex items-center gap-5">
			{#each navLinks as link (link.route)}
				<li class="relative group">
					{#if activeLink !== link.route}
					<span
						class="absolute h-0.5 bottom-0 bg-primary w-0 group-hover:w-full transition-all duration-200 ease-linear"></span>
					{/if}
					<a href={link.route} class={cn("text-lg font-semibold text-white", {
						"text-primary": activeLink === link.route,
					})}
					>{link.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
