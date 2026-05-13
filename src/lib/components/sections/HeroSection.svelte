<script lang="ts">
	import { onMount } from 'svelte';
	import type { Person } from '$lib/types';

	const COLS = 26;
	const ROWS = 14;

	interface Props {
		person: Person;
		onScrollToWork: () => void;
		onScrollToContact: () => void;
		onCleanup: (fn: () => void) => void;
	}

	let { person, onScrollToWork, onScrollToContact, onCleanup }: Props = $props();

	let svgRef: SVGSVGElement;
	let heroInnerRef: HTMLElement;

	onMount(() => {
		(async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			// Hero text entrance
			if (heroInnerRef) {
				const lines = heroInnerRef.querySelectorAll('.hero-line');
				const subs = heroInnerRef.querySelectorAll('.hero-sub, .hero-actions, .hero-meta');
				if (lines.length)
					gsap.fromTo(
						lines,
						{ yPercent: 110, opacity: 0 },
						{ yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out', stagger: 0.14, delay: 0.15 }
					);
				if (subs.length)
					gsap.fromTo(
						subs,
						{ y: 16, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.1, delay: 0.7 }
					);
			}

			// Hero SVG grid animation
			if (svgRef) {
				const cells = svgRef.querySelectorAll('.cell');
				const nodes = svgRef.querySelectorAll('.node');
				const ring = svgRef.querySelector('.ring');
				const scan = svgRef.querySelector('.scan');
				let alive = true;
				const tids: ReturnType<typeof setTimeout>[] = [];
				const tweens: { kill?: () => void }[] = [];
				const after = (fn: () => void, ms: number) => {
					const id = setTimeout(fn, ms);
					tids.push(id);
				};

				tweens.push(
					gsap.fromTo(
						nodes,
						{ opacity: 0, attr: { r: 0 } },
						{
							opacity: 1,
							attr: { r: 0.06 },
							duration: 1.0,
							ease: 'power2.out',
							stagger: { each: 0.008, from: 'center', grid: [ROWS + 1, COLS + 1] }
						}
					)
				);

				const wave = () => {
					if (!alive) return;
					const rowStart = Math.floor(Math.random() * ROWS);
					const dir = Math.random() < 0.5 ? 1 : -1;
					const colStart = dir === 1 ? 0 : COLS - 1;
					for (let i = 0; i < COLS; i++) {
						const c = colStart + dir * i;
						const rr = rowStart + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
						if (rr < 0 || rr >= ROWS) continue;
						const el = cells[rr * COLS + c];
						if (!el) continue;
						const t = gsap.timeline({ delay: i * 0.04 });
						t.to(el, { opacity: 0.2, duration: 0.25, ease: 'power1.out' }).to(el, {
							opacity: 0,
							duration: 1.3,
							ease: 'power2.out'
						});
						tweens.push(t);
					}
					after(wave, 2200 + Math.random() * 1800);
				};

				const cluster = () => {
					if (!alive) return;
					const cx = Math.floor(Math.random() * COLS);
					const cy = Math.floor(Math.random() * ROWS);
					for (let dy = -2; dy <= 2; dy++) {
						for (let dx = -2; dx <= 2; dx++) {
							const rr = cy + dy,
								cc = cx + dx;
							if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
							const d = Math.hypot(dx, dy);
							if (d > 2.2 || Math.random() > 1 - d / 3) continue;
							const el = cells[rr * COLS + cc];
							if (!el) continue;
							el.classList.add('glow');
							const t = gsap.timeline({ delay: d * 0.08 });
							t.to(el, {
								opacity: Math.max(0.08, 0.5 - d * 0.14),
								duration: 0.35,
								ease: 'power2.out'
							}).to(el, {
								opacity: 0,
								duration: 1.2,
								ease: 'power2.out',
								onComplete: () => el.classList.remove('glow')
							});
							tweens.push(t);
						}
					}
					if (ring) {
						gsap.set(ring, { attr: { cx: cx + 0.5, cy: cy + 0.5, r: 0.3 }, opacity: 0.7 });
						tweens.push(
							gsap.to(ring, { attr: { r: 5.5 }, opacity: 0, duration: 2.0, ease: 'power2.out' })
						);
					}
					after(cluster, 2400 + Math.random() * 2200);
				};

				const sweep = () => {
					if (!alive) return;
					const fromLeft = Math.random() < 0.5;
					const startX = fromLeft ? 0 : COLS,
						endX = fromLeft ? COLS : 0;
					if (scan) {
						gsap.set(scan, { attr: { x1: startX, y1: 0, x2: startX, y2: ROWS }, opacity: 0.9 });
						tweens.push(
							gsap.to(scan, {
								attr: { x1: endX, x2: endX },
								duration: 1.8,
								ease: 'power2.inOut',
								onComplete: () => {
									gsap.to(scan, { opacity: 0, duration: 0.2 });
								}
							})
						);
					}
					const order = fromLeft ? [...Array(COLS).keys()] : [...Array(COLS).keys()].reverse();
					order.forEach((col, i) => {
						const delay = (i / COLS) * 1.7;
						for (let n = 0; n < 2; n++) {
							const row = Math.floor(Math.random() * ROWS);
							const el = cells[row * COLS + col];
							if (!el) continue;
							const t = gsap.timeline({ delay });
							t.to(el, { opacity: 0.4, duration: 0.18, ease: 'power2.out' }).to(el, {
								opacity: 0,
								duration: 0.9,
								ease: 'power2.out'
							});
							tweens.push(t);
						}
					});
					after(sweep, 6500 + Math.random() * 4000);
				};

				const pulseNodes = () => {
					if (!alive) return;
					const count = 4 + Math.floor(Math.random() * 5);
					const picked = new Set<Element>();
					while (picked.size < count) picked.add(nodes[Math.floor(Math.random() * nodes.length)]);
					[...picked].forEach((n, i) => {
						n.classList.add('hot');
						const t = gsap.timeline({ delay: i * 0.08 });
						t.fromTo(n, { attr: { r: 0.06 } }, { attr: { r: 0.22 }, duration: 0.35, ease: 'power2.out' }).to(
							n,
							{
								attr: { r: 0.06 },
								duration: 1.2,
								ease: 'power2.out',
								onComplete: () => n.classList.remove('hot')
							}
						);
						tweens.push(t);
					});
					after(pulseNodes, 1800 + Math.random() * 1400);
				};

				after(wave, 900);
				after(cluster, 1500);
				after(sweep, 2800);
				after(pulseNodes, 1100);

				onCleanup(() => {
					alive = false;
					tids.forEach(clearTimeout);
					tweens.forEach((t) => t.kill?.());
				});
			}
		})();
	});
</script>

<section class="hero" id="top">
	<div class="hero-grid-bg" aria-hidden="true"></div>
	<svg
		bind:this={svgRef}
		class="hero-grid-svg"
		viewBox={`0 0 ${COLS} ${ROWS}`}
		preserveAspectRatio="xMidYMid slice"
		aria-hidden="true"
	>
		{#each { length: ROWS } as _, r}
			{#each { length: COLS } as _, c}
				<rect class="cell" x={c} y={r} width="1" height="1" />
			{/each}
		{/each}
		<line class="scan" x1="0" y1="0" x2="0" y2={ROWS} />
		<circle class="ring" cx="0" cy="0" r="0.3" />
		{#each { length: ROWS + 1 } as _, r}
			{#each { length: COLS + 1 } as _, c}
				<circle class="node" cx={c} cy={r} r="0.06" />
			{/each}
		{/each}
	</svg>

	<div class="shell hero-inner" bind:this={heroInnerRef}>
		<div>
			<span class="eyebrow">{person.role}, est. 2017</span>
			<h1 style="overflow:hidden;">
				<span class="hero-line" style="display:block;">I build web products</span>
				<span class="hero-line" style="display:block;">that are fast, resilient,</span>
				<span class="hero-line" style="display:block;"><span class="accent">and scale.</span></span>
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
						stroke-linejoin="round"
						><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
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
				<span class="item"
					><span class="k">SHIPPING SINCE</span><span class="v">2017</span></span
				>
			</div>
		</div>
	</div>
</section>
