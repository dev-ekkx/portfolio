<script lang="ts">
	import ScrollItem from '$lib/ui-elements/scroll-item.svelte';

	let isVisible = $state(false);
	let element = $state<HTMLElement | null>(null);


</script>

<!--{#if isInView}-->

<section class="g-px flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-4"
>
	<ScrollItem direction="left">
		<div class="flex flex-col gap-2 pt-8">
			<h2 class="capitalize text-primary font-semibold text-2xl">#about me</h2>
			<p>I'm a creative Software Engineer specialized in Angular, React, Next, Nest, SvelteKit, and Golang for
				building
				high-performance, scalable, and responsive applications with a string foundation in Cloud Engineering using
				AWS</p>
		</div>
	</ScrollItem>
	<ScrollItem direction="right">
		<div class="flex flex-col h-[20rem] md:h-[22rem] border-2">
		</div>
	</ScrollItem>
</section>
<!--{/if}-->
