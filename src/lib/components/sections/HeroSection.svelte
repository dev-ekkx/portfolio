<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Person } from '$lib/interfaces';

	interface Props {
		person: Person;
		onScrollToWork: () => void;
		onScrollToContact: () => void;
	}

	let { person, onScrollToWork, onScrollToContact }: Props = $props();
</script>

<section class="hero" id="top">
	<div class="hero-grid-bg" aria-hidden="true"></div>

	<div class="hero-inner container">
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
				<Button onclick={onScrollToWork}>
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
				</Button>
				<Button variant="ghost" onclick={onScrollToContact}>Get in touch</Button>
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

<style>
	.hero {
		position: relative;
		background: var(--canvas);
		color: var(--canvas-fg);
		overflow: hidden;
		border-bottom: 1px solid var(--canvas-line);
	}
	.hero::after {
		content: '';
		position: absolute;
		pointer-events: none;
		right: -120px;
		top: -40px;
		width: 480px;
		height: 480px;
		background: radial-gradient(
			circle at 30% 30%,
			color-mix(in srgb, var(--accent) 35%, transparent) 0%,
			transparent 65%
		);
		filter: blur(8px);
		opacity: 0.9;
		z-index: 1;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		padding-block: 120px 140px;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
	}
	.hero h1 {
		font-family: var(--font-display);
		font-weight: var(--fw-semibold);
		font-size: clamp(40px, 7.2vw, 88px);
		line-height: 1.04;
		letter-spacing: -0.025em;
		margin: 16px 0 24px;
		max-width: 18ch;
		text-wrap: balance;
	}
	.hero h1 .accent {
		color: var(--accent);
	}
	.hero-sub {
		font-family: var(--font-body);
		font-size: clamp(16px, 1.4vw, 19px);
		line-height: 1.6;
		color: var(--canvas-fg-muted);
		max-width: 56ch;
		margin: 0 0 36px;
	}
	.hero-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		align-items: center;
	}
	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		margin-top: 60px;
		color: var(--canvas-fg-muted);
		font-size: 13px;
		font-family: var(--font-mono);
		letter-spacing: 0.02em;
	}
	.hero-meta .item {
		display: inline-flex;
		align-items: baseline;
		gap: 8px;
	}
	.hero-meta .k {
		color: var(--accent);
	}
	.hero-meta .v {
		color: var(--canvas-fg);
	}
	.hero-meta .item.live .k::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-success-500);
		margin-right: 8px;
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-success-500) 30%, transparent);
		animation: blink 2.4s ease-in-out infinite;
		vertical-align: middle;
		transform: translateY(-1px);
	}
	.hero-grid-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image:
			linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		-webkit-mask-image: radial-gradient(
			ellipse 80% 70% at 50% 38%,
			#000 0%,
			#000 55%,
			transparent 92%
		);
		mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 0%, #000 55%, transparent 92%);
		animation:
			gridDrift 20s linear infinite,
			gridBreath 8s ease-in-out infinite;
	}
	/* accent glow that pulses from the centre */
	.hero-grid-bg::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 65% 55% at 50% 38%,
			color-mix(in srgb, var(--accent) 14%, transparent) 0%,
			transparent 70%
		);
		animation: gridGlow 7s ease-in-out infinite;
	}
	/* diagonal shimmer beam that sweeps across */
	.hero-grid-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			112deg,
			transparent 20%,
			rgba(255, 255, 255, 0.04) 40%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.04) 60%,
			transparent 80%
		);
		animation: gridSweep 12s ease-in-out infinite 1.5s;
	}
	@keyframes gridDrift {
		from { background-position: 0 0; }
		to { background-position: 80px 80px; }
	}
	@keyframes gridBreath {
		0%, 100% { opacity: 0.65; }
		50% { opacity: 1; }
	}
	@keyframes gridGlow {
		0%, 100% { opacity: 0.35; transform: scale(0.98); }
		50% { opacity: 1; transform: scale(1.04); }
	}
	@keyframes gridSweep {
		0% { transform: translateX(-140%); }
		100% { transform: translateX(240%); }
	}
</style>
