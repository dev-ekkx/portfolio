<script lang="ts">
	import type { Person } from '$lib/interfaces';
	import type { Fact } from '$lib/types';

	interface Props {
		person: Person;
		facts: Fact[];
	}

	let { person, facts }: Props = $props();
</script>

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
		<div class="grid [grid-template-columns:320px_minmax(0,1fr)] gap-20 items-start max-[880px]:grid-cols-1 max-[880px]:gap-10">
			<div class="reveal">
				<div
					class="relative aspect-[4/5] rounded-xl overflow-hidden flex items-end justify-center"
					style="background: radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 55%), linear-gradient(160deg, var(--color-blue-800) 0%, var(--color-blue-900) 100%);"
					aria-label="Portrait placeholder"
				>
					<span class="absolute left-[-30%] right-[-30%] h-[70px] bg-[var(--accent)] rotate-[-22deg] top-[30%] opacity-35 h-[14px] translate-y-[50px]"></span>
					<span class="absolute left-[-30%] right-[-30%] h-[70px] bg-[var(--accent)] rotate-[-22deg] top-[30%] opacity-92"></span>
					<span class="absolute inset-[14px] border border-white/[0.18] rounded-lg pointer-events-none"></span>
					<span class="[font-family:var(--font-display)] font-semibold text-[140px] tracking-[-0.04em] text-white/[0.92] leading-none mb-[-16px] select-none">{person.initials}</span>
					<span class="absolute bottom-[18px] left-[18px] bg-black/50 text-white px-[10px] py-[6px] rounded-[20px] [font-family:var(--font-mono)] text-[11px] z-[2]">Emmanuel Kpendo</span>
				</div>
			</div>
			<div class="reveal">
				<p class="text-[18px] leading-[1.65] text-ink/[0.88] mb-[22px] max-w-[60ch]">
					I grew up curious about how things connect. Early on I realized software was the fastest
					way to build systems that matter, so I went deep: <strong class="text-accent-site font-semibold">full-stack from day one</strong>,
					cloud infrastructure from early on, and product thinking baked in throughout.
				</p>
				<p class="text-[18px] leading-[1.65] text-ink/[0.88] mb-[22px] max-w-[60ch]">
					Today I work as a senior engineer at <strong class="text-accent-site font-semibold">AmaliTech</strong>, building multi-tenant
					platforms and AI-powered dashboards for fintech and logistics clients. I lead both frontend
					delivery and backend architecture, and I care deeply about the seam where elegant UI meets
					resilient services.
				</p>
				<p class="text-[18px] leading-[1.65] text-ink/[0.88] mb-[22px] max-w-[60ch]">
					Outside work I read widely, tinker with side projects, and believe that the best
					engineering decisions come from genuinely understanding the problem first.
				</p>
				<div class="mt-10 grid grid-cols-3 max-[720px]:grid-cols-2 gap-x-8 gap-y-2 border-t border-line pt-6">
					{#each facts as f}
						<div>
							<div class="[font-family:var(--font-mono)] text-[11px] uppercase text-ink-muted tracking-[0.04em]">{f.k}</div>
							<div class="[font-family:var(--font-display)] text-[18px] font-medium text-ink mt-1 tracking-[-0.01em]">{f.v}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
