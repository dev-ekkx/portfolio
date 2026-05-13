<script lang="ts">
	import { onMount } from 'svelte';
	import type { StackGroup } from '$lib/interfaces';

	interface Props {
		stack: StackGroup[];
	}

	let { stack }: Props = $props();

	let stackGridRef: HTMLElement;

	onMount(() => {
		(async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			if (stackGridRef) {
				const groups = stackGridRef.querySelectorAll('.stack-group');
				groups.forEach((g, gi) => {
					const pills = g.querySelectorAll('.stack-pill');
					gsap.fromTo(
						pills,
						{ y: 14, opacity: 0, scale: 0.92 },
						{
							y: 0,
							opacity: 1,
							scale: 1,
							duration: 0.55,
							ease: 'back.out(1.4)',
							stagger: 0.04,
							delay: gi * 0.08,
							scrollTrigger: { trigger: g, start: 'top 85%', toggleActions: 'play none none none' }
						}
					);
				});
			}
		})();
	});
</script>

<section id="stack" class="p-section bg-canvas">
	<div class="shell">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">04 · Stack</span>
				<h2 class="section-title">What I reach for.</h2>
			</div>
			<p class="lead">Tools earn their place by being boring, fast, and well-documented.</p>
		</div>
		<div class="stack-grid" bind:this={stackGridRef}>
			{#each stack as g, i}
				<div class="stack-group">
					<div class="gh">
						<span class="gname">{g.name}</span>
						<span class="gnum">{String(i + 1).padStart(2, '0')} / {stack.length}</span>
					</div>
					<div class="gnote">{g.note}</div>
					<div class="stack-pills">
						{#each g.items as it}<span class="stack-pill">{it}</span>{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
