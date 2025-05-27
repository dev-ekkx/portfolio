<script lang="ts">
	import LogoComponent from '$lib/ui-elements/logo.svelte';
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
	class={cn(
		'g-px sticky top-0 z-50 flex items-center justify-between transition-all duration-300 ease-linear',
		{
			'backdrop-blur-xs shadow': isScrolled
		}
	)}
>
	<LogoComponent />

	<nav>
		<ul class="hidden md:flex items-center gap-5">
			{#each navLinks as link (link.route)}
				<li class="group relative">
					{#if activeLink !== link.route}
						<span
							class="bg-primary absolute bottom-0 h-0.5 w-0 transition-all duration-200 ease-linear group-hover:w-full"
						></span>
					{/if}
					<a
						href={link.route}
						class={cn('text-lg font-semibold', {
							'text-primary pointer-events-none': activeLink === link.route
						})}>{link.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
