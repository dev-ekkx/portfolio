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

<style>
  .stack-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 40px; }
  .stack-group { display: flex; flex-direction: column; gap: 20px; }
  .stack-group .gh { display: flex; align-items: baseline; justify-content: space-between; padding-bottom: 14px; border-bottom: 1px solid var(--canvas-line); }
  .stack-group .gh .gname { font-family: var(--font-display); font-size: 20px; font-weight: var(--fw-medium); color: var(--canvas-fg); letter-spacing: -0.01em; }
  .stack-group .gh .gnum { font-family: var(--font-mono); font-size: 11px; color: var(--canvas-fg-muted); letter-spacing: 0.06em; }
  .stack-group .gnote { font-family: var(--font-mono); font-size: 11px; color: var(--canvas-fg-muted); letter-spacing: 0.04em; text-transform: uppercase; margin: -8px 0 -4px; }
  .stack-pills { display: flex; flex-wrap: wrap; gap: 6px; }
  .stack-pill { font-family: var(--font-body); font-size: 13px; font-weight: var(--fw-medium); color: var(--canvas-fg); padding: 7px 12px; border-radius: var(--radius-md); background: rgba(255,255,255,.04); border: 1px solid var(--canvas-line); display: inline-flex; align-items: center; gap: 8px; cursor: default; transition: 220ms var(--easing-default); will-change: transform, background, border-color; }
  .stack-pill:hover { background: color-mix(in srgb, var(--accent) 18%, transparent); border-color: color-mix(in srgb, var(--accent) 60%, transparent); transform: translateY(-2px); }
  @media (max-width: 980px) { .stack-grid { grid-template-columns: repeat(2,1fr); gap: 32px; } }
  @media (max-width: 540px) { .stack-grid { grid-template-columns: 1fr; gap: 28px; } }
</style>

<section id="stack" class="p-section bg-canvas">
	<div class="container">
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
