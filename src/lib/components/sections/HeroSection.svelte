<script lang="ts">
	import type { Person } from '$lib/interfaces';
	import { onMount } from 'svelte';

	const COLS = 26;
	const ROWS = 14;

	interface Props {
		person: Person;
		onScrollToWork: () => void;
		onScrollToContact: () => void;
	}

	let { person, onScrollToWork, onScrollToContact }: Props = $props();

	onMount(() => {
		let alive = true;
		const tids: ReturnType<typeof setTimeout>[] = [];
		const tweens: { kill?: () => void }[] = [];
		const after = (fn: () => void, ms: number) => {
			const id = setTimeout(fn, ms);
			tids.push(id);
		};

		(async () => {
			const { gsap } = await import('gsap');
		})();

		return () => {
			alive = false;
			tids.forEach(clearTimeout);
			tweens.forEach((t) => t.kill?.());
		};
	});
</script>

<style>
  .hero {
    position: relative; background: var(--canvas);
    color: var(--canvas-fg); overflow: hidden;
    border-bottom: 1px solid var(--canvas-line);
  }
  .hero::after {
    content: ""; position: absolute; pointer-events: none;
    right: -120px; top: -40px; width: 480px; height: 480px;
    background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 35%, transparent) 0%, transparent 65%);
    filter: blur(8px); opacity: .9; z-index: 1;
  }
  .hero-inner {
    position: relative; z-index: 1;
    padding: 120px 0 140px;
    display: grid; grid-template-columns: 1fr; gap: var(--space-12);
  }
  .hero h1 {
    font-family: var(--font-display); font-weight: var(--fw-semibold);
    font-size: clamp(40px, 7.2vw, 88px); line-height: 1.04;
    letter-spacing: -0.025em; margin: 16px 0 24px;
    max-width: 18ch; text-wrap: balance;
  }
  .hero h1 .accent { color: var(--accent); }
  .hero-sub {
    font-family: var(--font-body);
    font-size: clamp(16px, 1.4vw, 19px); line-height: 1.6;
    color: var(--canvas-fg-muted); max-width: 56ch; margin: 0 0 36px;
  }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .hero-meta {
    display: flex; flex-wrap: wrap; gap: 28px; margin-top: 60px;
    color: var(--canvas-fg-muted); font-size: 13px;
    font-family: var(--font-mono); letter-spacing: 0.02em;
  }
  .hero-meta .item { display: inline-flex; align-items: baseline; gap: 8px; }
  .hero-meta .k { color: var(--accent); }
  .hero-meta .v { color: var(--canvas-fg); }
  .hero-meta .item.live .k::before {
    content: ""; display: inline-block; width: 6px; height: 6px; border-radius: 50%;
    background: var(--color-success-500); margin-right: 8px;
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-success-500) 30%, transparent);
    animation: blink 2.4s ease-in-out infinite; vertical-align: middle; transform: translateY(-1px);
  }
  .hero-grid-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(to right, rgba(255,255,255,.07) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,.07) 1px, transparent 1px);
    background-size: 80px 80px; background-position: 0 0;
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 0%, #000 55%, transparent 92%);
            mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 0%, #000 55%, transparent 92%);
    animation: gridDrift 32s linear infinite;
  }
  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 80px 80px; }
  }
</style>

<section class="hero" id="top">
	<div class="hero-grid-bg" aria-hidden="true"></div>

	<div class="container hero-inner">
		<div>
			<span class="eyebrow">{person.role}, est. 2017</span>
			<h1>
				<span style="display:block;">I build web products</span>
				<span style="display:block;">that are fast, resilient,</span>
				<span style="display:block;"><span class="accent">and scale.</span></span>
			</h1>
			<p class="hero-sub">
				Hi, I'm <strong style="color:var(--canvas-fg);font-weight:500;">{person.name}</strong>, a
				senior full-stack engineer based in {person.location}. I care about correct data models,
				fast response times, and cloud infrastructure that holds under pressure.
			</p>
			<div class="hero-actions">
				<button onclick={onScrollToWork} class="btn btn-primary">
					View selected work
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
					>
				</button>
				<button onclick={onScrollToContact} class="btn btn-ghost-on-canvas"> Get in touch </button>
			</div>
			<div class="hero-meta">
				<span class="item live"
					><span class="k">STATUS</span><span class="v">{person.available}</span></span
				>
				<span class="item"><span class="k">BASED IN</span><span class="v">Accra, GH</span></span>
				<span class="item"><span class="k">TIMEZONE</span><span class="v">GMT, UTC+0</span></span>
				<span class="item"><span class="k">SHIPPING SINCE</span><span class="v">2017</span></span>
			</div>
		</div>
	</div>
</section>
