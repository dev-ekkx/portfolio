<script lang="ts">
	import type { WorkProject } from '$lib/types';

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

<section id="work" class="p-section">
	<div class="shell">
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

		<div class="filter-row reveal">
			<div class="chips">
				{#each projectTags as t}
					<button class={`chip-btn ${filter === t ? 'active' : ''}`} onclick={() => (filter = t)}>
						{t}
						<span class="count"
							>{t === 'All'
								? projects.length
								: projects.filter((p) => p.tags.includes(t)).length}</span
						>
					</button>
				{/each}
			</div>
			<div class="view-toggle" role="tablist" aria-label="Project view">
				<button
					class={view === 'cards' ? 'active' : ''}
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
					class={view === 'list' ? 'active' : ''}
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
			<div class="projects-grid">
				{#each filteredProjects as p, i}
					<div class="reveal" style={`transition-delay:${i * 60}ms`}>
						<article class="project-card">
							<div class="meta-row">
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
							<h3>{p.title}</h3>
							<p class="role">{p.role}</p>

							{#if p.thumbVariant === 'tradewind'}
								<div class="thumb tradewind">
									<div class="layer"></div>
									<div class="bars">
										<span style="height:30%"></span><span style="height:55%"></span><span
											style="height:80%"
										></span>
										<span style="height:45%"></span><span style="height:62%"></span><span
											style="height:70%"
										></span>
										<span style="height:40%"></span><span style="height:85%"></span>
									</div>
									<span class="thumb-tag">{p.thumbCaption}</span>
								</div>
							{:else if p.thumbVariant === 'voyager'}
								<div class="thumb voyager">
									<div class="chart"></div>
									<svg viewBox="0 0 400 220" preserveAspectRatio="none">
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
									<div class="badge">live · {p.stats[2].v} {p.stats[2].l}</div>
									<span class="thumb-tag">{p.thumbCaption}</span>
								</div>
							{:else}
								<div class="thumb larch">
									<div class="doc">
										<div class="lock">
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
										<div class="ln title"></div>
										<div class="ln"></div>
										<div class="ln"></div>
										<div class="ln short"></div>
										<div class="ln"></div>
										<div class="ln short"></div>
										<div class="ln"></div>
									</div>
									<span class="thumb-tag">{p.thumbCaption}</span>
								</div>
							{/if}

							<p class="blurb">{p.blurb}</p>
							<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px;">
								{#each p.stack as s}<span class="tg-pill">{s}</span>{/each}
							</div>
							<div class="stats">
								{#each p.stats as st}
									<div class="stat">
										<div class="v">{st.v}</div>
										<div class="l">{st.l}</div>
									</div>
								{/each}
							</div>
						</article>
					</div>
				{/each}
			</div>
		{:else}
			<div class="projects-list">
				{#each filteredProjects as p}
					<div class="reveal">
						<a class="proj-row" href={`#${p.id}`} onclick={(e) => e.preventDefault()}>
							<span class="yr">{p.year}</span>
							<span class="ttl">{p.title}<small>{p.role}</small></span>
							<span class="desc">{p.blurb}</span>
							<span class="tg"
								>{#each p.stack.slice(0, 3) as s}<span class="tg-pill">{s}</span>{/each}</span
							>
							<span class="arr">
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
