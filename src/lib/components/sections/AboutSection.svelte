<script lang="ts">
	import type { Person } from '$lib/interfaces';
	import type { Fact } from '$lib/types';

	interface Props {
		person: Person;
		facts: Fact[];
	}

	let { person, facts }: Props = $props();
</script>

<style>
  .about-grid { display: grid; grid-template-columns: 320px minmax(0,1fr); gap: 80px; align-items: start; }
  @media (max-width: 880px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }

  .portrait {
    position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl);
    background: radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 55%),
                linear-gradient(160deg, var(--color-blue-800) 0%, var(--color-blue-900) 100%);
    overflow: hidden; display: flex; align-items: flex-end; justify-content: center;
  }
  .portrait .initials { font-family: var(--font-display); font-weight: var(--fw-semibold); font-size: 140px; letter-spacing: -0.04em; color: rgba(255,255,255,.92); line-height: 1; margin-bottom: -16px; user-select: none; }
  .portrait .slab1, .portrait .slab2 { position: absolute; left: -30%; right: -30%; height: 70px; background: var(--accent); transform: rotate(-22deg); }
  .portrait .slab1 { top: 30%; opacity: .92; }
  .portrait .slab2 { top: 30%; opacity: .35; height: 14px; transform: rotate(-22deg) translateY(50px); }
  .portrait .frame { position: absolute; inset: 14px; border: 1px solid rgba(255,255,255,.18); border-radius: var(--radius-lg); pointer-events: none; }
  .portrait .tag { position: absolute; bottom: 18px; left: 18px; background: rgba(0,0,0,.5); color: #fff; padding: 6px 10px; border-radius: 20px; font-family: var(--font-mono); font-size: 11px; z-index: 2; }

  .about-body p { font-size: 18px; line-height: 1.65; color: var(--ink); opacity: .88; margin: 0 0 22px; max-width: 60ch; }
  .about-body p strong { color: var(--accent); font-weight: var(--fw-semibold); }

  .about-facts { margin-top: 40px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px 32px; border-top: 1px solid var(--line); padding-top: 24px; }
  .about-facts .fact .k { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--ink-muted); letter-spacing: 0.04em; }
  .about-facts .fact .v { font-family: var(--font-display); font-size: 18px; font-weight: var(--fw-medium); color: var(--ink); margin-top: 4px; letter-spacing: -0.01em; }
  @media (max-width: 720px) { .about-facts { grid-template-columns: repeat(2,1fr); } }
</style>

<section id="about" class="p-section bg-alt">
	<div class="container">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">02 · About</span>
				<h2 class="section-title">The person behind the commits.</h2>
			</div>
			<p class="lead">
				Eight years in, multiple product domains, and one consistent throughline: ownership from
				design through production.
			</p>
		</div>
		<div class="about-grid">
			<div class="reveal">
				<div class="portrait" aria-label="Portrait placeholder">
					<span class="slab2"></span>
					<span class="slab1"></span>
					<span class="frame"></span>
					<span class="initials">{person.initials}</span>
					<span class="tag">Emmanuel Kpendo</span>
				</div>
			</div>
			<div class="about-body reveal">
				<p>
					I grew up curious about how things connect. Early on I realized software was the fastest
					way to build systems that matter, so I went deep: <strong>full-stack from day one</strong>,
					cloud infrastructure from early on, and product thinking baked in throughout.
				</p>
				<p>
					Today I work as a senior engineer at <strong>AmaliTech</strong>, building multi-tenant
					platforms and AI-powered dashboards for fintech and logistics clients. I lead both frontend
					delivery and backend architecture, and I care deeply about the seam where elegant UI meets
					resilient services.
				</p>
				<p>
					Outside work I read widely, tinker with side projects, and believe that the best
					engineering decisions come from genuinely understanding the problem first.
				</p>
				<div class="about-facts">
					{#each facts as f}
						<div class="fact">
							<div class="k">{f.k}</div>
							<div class="v">{f.v}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
