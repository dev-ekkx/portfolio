<script lang="ts">
	import type { WorkProject } from '$lib/interfaces';

	interface Props {
		projects: WorkProject[];
		projectTags: string[];
	}

	let { projects, projectTags }: Props = $props();

	let view = $state<'cards' | 'list'>('cards');
	let filter = $state('All');

	let filteredProjects = $derived(
		filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))
	);
</script>

<style>
  /* pseudo-elements that cannot be expressed in Tailwind */
  .thumb-tradewind .layer::before,
  .thumb-tradewind .layer::after {
    content: "";
    position: absolute;
    left: 16px;
    right: 16px;
    background: rgba(255,255,255,.10);
    border-radius: 3px;
    height: 8px;
  }
  .thumb-tradewind .layer::before { top: 18px; width: 50%; background: var(--accent); }
  .thumb-tradewind .layer::after  { top: 36px; height: 4px; }

  .thumb-voyager .badge::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-success-500);
  }

  /* child-selector hover: arrow rotation on row hover */
  .proj-row:hover .arr {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    transform: rotate(-45deg);
  }
</style>

<section id="work" class="p-section">
	<div class="container">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">01 · Selected work</span>
				<h2 class="section-title">Things I've shipped, and the work behind them.</h2>
			</div>
			<p class="lead">
				A small set of projects from the last few years. Each one moved a real metric: faster
				pipelines, lower latency, fewer incidents.
			</p>
		</div>

		<!-- Filter row -->
		<div class="reveal flex items-center justify-between gap-4 mb-8 flex-wrap">
			<!-- Chips -->
			<div class="flex gap-2 flex-wrap">
				{#each projectTags as t}
					<button
						class={[
							'[font-family:var(--font-body)] text-[13px] font-medium px-[14px] py-2 rounded-full border cursor-pointer transition-[120ms_ease-out]',
							filter === t
								? 'bg-ink text-surface border-ink'
								: 'bg-transparent border-line text-ink-muted hover:text-ink hover:border-ink-muted'
						].join(' ')}
						onclick={() => (filter = t)}
					>
						{t}
						<span class="opacity-55 ml-[6px] [font-family:var(--font-mono)] text-[11px]"
							>{t === 'All'
								? projects.length
								: projects.filter((p) => p.tags.includes(t)).length}</span
						>
					</button>
				{/each}
			</div>

			<!-- View toggle -->
			<div
				class="inline-flex gap-[2px] p-[3px] bg-surface-alt rounded-md border border-line"
				role="tablist"
				aria-label="Project view"
			>
				<button
					class={[
						'border-0 px-[10px] py-[6px] rounded-[5px] text-[12px] cursor-pointer inline-flex items-center gap-[6px] [font-family:var(--font-body)] font-medium',
						view === 'cards'
							? 'bg-surface text-ink shadow-[var(--shadow-xs)]'
							: 'bg-transparent text-ink-muted'
					].join(' ')}
					onclick={() => (view = 'cards')}
					aria-label="Card view"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect x="3" y="3" width="7" height="7" rx="1" /><rect
							x="14"
							y="3"
							width="7"
							height="7"
							rx="1"
						/><rect x="3" y="14" width="7" height="7" rx="1" /><rect
							x="14"
							y="14"
							width="7"
							height="7"
							rx="1"
						/></svg
					>
					Cards
				</button>
				<button
					class={[
						'border-0 px-[10px] py-[6px] rounded-[5px] text-[12px] cursor-pointer inline-flex items-center gap-[6px] [font-family:var(--font-body)] font-medium',
						view === 'list'
							? 'bg-surface text-ink shadow-[var(--shadow-xs)]'
							: 'bg-transparent text-ink-muted'
					].join(' ')}
					onclick={() => (view = 'list')}
					aria-label="List view"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path
							d="M3 6h.01"
						/><path d="M3 12h.01" /><path d="M3 18h.01" /></svg
					>
					List
				</button>
			</div>
		</div>

		{#if view === 'cards'}
			<!-- Projects grid -->
			<div class="grid grid-cols-2 max-[880px]:grid-cols-1 gap-[28px]">
				{#each filteredProjects as p, i}
					<div class="reveal" style={`transition-delay:${i * 60}ms`}>
						<article
							class="bg-surface-card border border-line rounded-xl p-[28px_28px_32px] flex flex-col relative overflow-hidden cursor-pointer transition-[220ms_var(--easing-default)] hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--accent)_50%,var(--line))] hover:shadow-[0_24px_48px_-28px_color-mix(in_srgb,var(--ink)_30%,transparent)]"
						>
							<!-- Meta row -->
							<div
								class="flex items-center justify-between [font-family:var(--font-mono)] text-[11px] tracking-[0.04em] text-ink-muted uppercase"
							>
								<span>{p.year} · {p.tags.join(' / ')}</span>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg
								>
							</div>

							<h3
								class="[font-family:var(--font-display)] text-[28px] font-semibold tracking-[-0.018em] mt-[14px] mb-[8px] text-ink"
							>
								{p.title}
							</h3>
							<p class="text-[13px] text-ink-muted m-0 mb-6">{p.role}</p>

							<!-- Thumb variants -->
							{#if p.thumbVariant === 'tradewind'}
								<div
									class="thumb-tradewind h-[220px] rounded-lg relative overflow-hidden my-1 border border-line"
									style="background: radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 50%), linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-700) 100%);"
								>
									<div
										class="layer absolute inset-[32px] bg-white/[.04] border border-white/10 rounded-[6px] backdrop-blur-[4px]"
									></div>
									<div
										class="bars absolute left-[48px] right-[48px] bottom-[48px] flex gap-2 items-end h-[70px]"
									>
										<span class="flex-1 bg-white/20 rounded-t-[2px]" style="height:30%"></span><span
											class="flex-1 bg-white/20 rounded-t-[2px]"
											style="height:55%"></span><span
											class="flex-1 bg-[var(--accent)] rounded-t-[2px]"
											style="height:80%"
										></span>
										<span class="flex-1 bg-white/20 rounded-t-[2px]" style="height:45%"></span><span
											class="flex-1 bg-white/20 rounded-t-[2px]"
											style="height:62%"></span><span
											class="flex-1 bg-white/20 rounded-t-[2px]"
											style="height:70%"
										></span>
										<span class="flex-1 bg-white/20 rounded-t-[2px]" style="height:40%"></span><span
											class="flex-1 bg-white/20 rounded-t-[2px]"
											style="height:85%"></span>
									</div>
									<span
										class="absolute left-[18px] bottom-[18px] bg-black/45 text-white px-[10px] py-1 rounded-[20px] [font-family:var(--font-mono)] text-[11px] tracking-[0.02em] backdrop-blur-[6px]"
										>{p.thumbCaption}</span
									>
								</div>
							{:else if p.thumbVariant === 'voyager'}
								<div
									class="thumb-voyager h-[220px] rounded-lg relative overflow-hidden my-1 border border-line"
									style="background: linear-gradient(135deg, #0E2434 0%, #08283B 100%);"
								>
									<div
										class="chart absolute inset-0"
										style="background-image: linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 40px 28px;"
									></div>
									<svg
										class="absolute inset-0 w-full h-full"
										viewBox="0 0 400 220"
										preserveAspectRatio="none"
									>
										<defs>
											<linearGradient id="vg{p.id}" x1="0" y1="0" x2="0" y2="1">
												<stop offset="0%" stop-color="var(--accent)" stop-opacity="0.5" />
												<stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
											</linearGradient>
										</defs>
										<path
											d="M 0 170 L 40 160 L 80 140 L 120 145 L 160 110 L 200 95 L 240 80 L 280 50 L 320 60 L 360 35 L 400 25 L 400 220 L 0 220 Z"
											fill="url(#vg{p.id})"
										/>
										<path
											d="M 0 170 L 40 160 L 80 140 L 120 145 L 160 110 L 200 95 L 240 80 L 280 50 L 320 60 L 360 35 L 400 25"
											stroke="var(--accent)"
											stroke-width="2.5"
											fill="none"
										/>
										<circle cx="360" cy="35" r="5" fill="var(--accent)" />
										<circle cx="360" cy="35" r="9" fill="var(--accent)" fill-opacity="0.25" />
									</svg>
									<div
										class="badge absolute top-[18px] left-[18px] bg-white/[.06] border border-white/[.12] text-white px-[10px] py-[6px] rounded-[20px] [font-family:var(--font-mono)] text-[11px] inline-flex items-center gap-[6px]"
									>
										live · {p.stats[2].v}
										{p.stats[2].l}
									</div>
									<span
										class="absolute left-[18px] bottom-[18px] bg-black/45 text-white px-[10px] py-1 rounded-[20px] [font-family:var(--font-mono)] text-[11px] tracking-[0.02em] backdrop-blur-[6px]"
										>{p.thumbCaption}</span
									>
								</div>
							{:else}
								<div
									class="h-[220px] rounded-lg relative overflow-hidden my-1 border border-line flex items-center justify-center"
									style="background: var(--color-gray-50);"
								>
									<div
										class="doc w-[56%] aspect-[3/4] bg-surface-card rounded-[6px] shadow-[0_18px_40px_-16px_rgba(8,40,59,.18)] relative p-[18px_16px] flex flex-col gap-2 border border-line"
									>
										<div
											class="lock absolute top-[-14px] right-[-14px] w-[40px] h-[40px] rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-[16px] shadow-[0_10px_24px_-8px_color-mix(in_srgb,var(--accent)_50%,transparent)]"
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
												><rect x="4" y="11" width="16" height="10" rx="2" /><path
													d="M8 11V7a4 4 0 0 1 8 0v4"
												/></svg
											>
										</div>
										<div class="h-[9px] bg-ink rounded-[2px] w-[60%] mb-[6px]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px] w-[35%]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px] w-[35%]"></div>
										<div class="h-[6px] bg-[var(--color-gray-200)] rounded-[2px]"></div>
									</div>
									<span
										class="absolute left-[18px] bottom-[18px] bg-black/45 text-white px-[10px] py-1 rounded-[20px] [font-family:var(--font-mono)] text-[11px] tracking-[0.02em] backdrop-blur-[6px]"
										>{p.thumbCaption}</span
									>
								</div>
							{/if}

							<p class="text-[15px] leading-[1.55] text-ink opacity-[.82] mt-[18px] mb-6 max-w-[52ch]">
								{p.blurb}
							</p>
							<div class="flex gap-[6px] flex-wrap mb-[22px]">
								{#each p.stack as s}<span class="tg-pill">{s}</span>{/each}
							</div>
							<div
								class="flex gap-[18px] mt-auto border-t border-dashed border-line pt-[18px]"
							>
								{#each p.stats as st}
									<div class="stat">
										<div
											class="[font-family:var(--font-display)] text-[22px] font-semibold text-ink tracking-[-0.01em] leading-[1.1]"
										>
											{st.v}
										</div>
										<div
											class="text-[11px] text-ink-muted tracking-[0.04em] uppercase mt-1"
										>
											{st.l}
										</div>
									</div>
								{/each}
							</div>
						</article>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Projects list -->
			<div class="flex flex-col border-t border-line">
				{#each filteredProjects as p}
					<div class="reveal">
						<a
							class="proj-row grid max-[900px]:[grid-template-columns:60px_1fr_auto] [grid-template-columns:80px_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1.2fr)_auto] gap-[28px] max-[900px]:gap-[16px] items-center py-[28px] px-0 border-b border-line cursor-pointer transition-[160ms_var(--easing-default)] text-ink no-underline hover:pl-[12px] hover:pr-[12px] hover:bg-surface-alt"
							href={`#${p.id}`}
							onclick={(e) => e.preventDefault()}
						>
							<span
								class="yr [font-family:var(--font-mono)] text-[12px] text-ink-muted tracking-[0.04em]"
								>{p.year}</span
							>
							<span
								class="ttl [font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.015em]"
								>{p.title}<small
									class="block [font-family:var(--font-body)] font-normal text-[12px] text-ink-muted mt-1"
									>{p.role}</small
								></span
							>
							<span
								class="desc max-[900px]:hidden text-[14px] text-ink-muted leading-[1.55]"
								>{p.blurb}</span
							>
							<span class="tg max-[900px]:hidden flex gap-[6px] flex-wrap"
								>{#each p.stack.slice(0, 3) as s}<span class="tg-pill">{s}</span>{/each}</span
							>
							<span
								class="arr w-[36px] h-[36px] rounded-full border border-line inline-flex items-center justify-center text-ink-muted transition-[160ms_var(--easing-default)]"
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							</span>
						</a>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
