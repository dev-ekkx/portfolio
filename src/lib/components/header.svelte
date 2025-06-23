<script lang="ts">
	import LogoComponent from '$lib/ui-elements/logo.svelte';
	import navLinks from '$lib/data/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { cn } from '$lib/utils';

	let activeLink = $state(page.url.pathname);
	let showHeader = $state(false);

	onMount(() => {
		showHeader = true;
	});
</script>

{#if showHeader}
	<header
		in:fly={{y: -10, delay: 2000}}
		class="g-px backdrop-blur-sm bg-background/40 sticky top-0 z-50 flex items-center justify-between transition-all duration-100 ease-linear"
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
							'text-primary! pointer-events-none': activeLink === link.route
						})}>{link.title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</header>
{/if}
