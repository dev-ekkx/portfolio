<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let element = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisible = entry.isIntersecting;
				});
			},
			{
				threshold: 0.5 // trigger when 50% visible
			}
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});

</script>
<div
	class="border"
	use:inView
>

	<!--{#if isInView}-->
	<section class="g-px flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-4"
					 in:fly={isInView ? { y: 100, duration: 500 } : { y: -100, duration: 500 } }
	>
		<div class="flex flex-col gap-2 pt-8">
			<h2 class="capitalize text-primary font-semibold text-2xl">#about me</h2>
			<p>I'm a creative Software Engineer specialized in Angular, React, Next, Nest, SvelteKit, and Golang for
				building
				high-performance, scalable, and responsive applications with a string foundation in Cloud Engineering using
				AWS</p>
		</div>
		<div class="flex flex-col h-[20rem] md:h-[22rem] border-2">

		</div>
	</section>
	<!--{/if}-->
</div>
