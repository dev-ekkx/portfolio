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
	<div class="container">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">04 · Stack</span>
				<h2 class="section-title">What I reach for.</h2>
			</div>
			<p class="lead">Tools earn their place by being boring, fast, and well-documented.</p>
		</div>
		<div class="stack-grid grid grid-cols-4 max-[980px]:grid-cols-2 max-[540px]:grid-cols-1 gap-10 max-[980px]:gap-8 max-[540px]:gap-7" bind:this={stackGridRef}>
			{#each stack as g, i}
				<div class="stack-group flex flex-col gap-5">
					<div class="flex items-baseline justify-between pb-[14px] border-b border-canvas-line">
						<span class="[font-family:var(--font-display)] text-[20px] font-medium text-canvas-fg tracking-[-0.01em]">{g.name}</span>
						<span class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.06em]">{String(i + 1).padStart(2, '0')} / {stack.length}</span>
					</div>
					<div class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.04em] uppercase -mt-2 -mb-1">{g.note}</div>
					<div class="stack-pills flex flex-wrap gap-[6px]">
						{#each g.items as it}<span class="stack-pill [font-family:var(--font-body)] text-[13px] font-medium text-canvas-fg py-[7px] px-3 rounded-md bg-white/[0.04] border border-canvas-line inline-flex items-center gap-2 cursor-default transition-all duration-[220ms] hover:bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] hover:-translate-y-0.5">{it}</span>{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
