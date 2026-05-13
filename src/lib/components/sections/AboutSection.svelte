<script lang="ts">
	import type { Fact, Person } from '$lib/types';

	interface Props {
		person: Person;
		facts: Fact[];
	}

	let { person, facts }: Props = $props();
</script>

<section id="about" class="p-section bg-alt">
	<div class="shell">
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
