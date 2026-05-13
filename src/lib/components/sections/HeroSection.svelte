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

<section class="hero" id="top">
	<div class="hero-grid-bg" aria-hidden="true"></div>

	<div class="shell hero-inner">
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
