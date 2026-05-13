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
  /* ── Filter row ── */
  .filter-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
  .chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .chip-btn {
    font-family: var(--font-body); font-size: 13px; font-weight: var(--fw-medium);
    padding: 8px 14px; border-radius: var(--radius-full);
    background: transparent; border: 1px solid var(--line);
    color: var(--ink-muted); cursor: pointer; transition: 120ms ease-out;
  }
  .chip-btn:hover { color: var(--ink); border-color: var(--ink-muted); }
  .chip-btn.active { background: var(--ink); color: var(--surface); border-color: var(--ink); }
  .chip-btn .count { opacity: .55; margin-left: 6px; font-family: var(--font-mono); font-size: 11px; }
  .view-toggle { display: inline-flex; gap: 2px; padding: 3px; background: var(--surface-alt); border-radius: var(--radius-md); border: 1px solid var(--line); }
  .view-toggle button {
    border: 0; background: transparent; padding: 6px 10px; border-radius: 5px;
    font-size: 12px; color: var(--ink-muted); cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-body); font-weight: var(--fw-medium);
  }
  .view-toggle button.active { background: var(--surface); color: var(--ink); box-shadow: var(--shadow-xs); }

  /* ── Project grid ── */
  .projects-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 28px; }
  .projects-list { display: flex; flex-direction: column; border-top: 1px solid var(--line); }
  @media (max-width: 880px) { .projects-grid { grid-template-columns: 1fr; } }

  .project-card {
    background: var(--surface-card); border: 1px solid var(--line);
    border-radius: var(--radius-xl); padding: 28px 28px 32px;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden; cursor: pointer;
    transition: 220ms var(--easing-default);
  }
  .project-card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
    box-shadow: 0 24px 48px -28px color-mix(in srgb, var(--ink) 30%, transparent);
  }
  .project-card .meta-row {
    display: flex; align-items: center; justify-content: space-between;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em;
    color: var(--ink-muted); text-transform: uppercase;
  }
  .project-card h3 {
    font-family: var(--font-display); font-size: 28px; font-weight: var(--fw-semibold);
    letter-spacing: -0.018em; margin: 14px 0 8px; color: var(--ink);
  }
  .project-card .role { font-size: 13px; color: var(--ink-muted); margin: 0 0 24px; }
  .project-card .blurb { font-size: 15px; line-height: 1.55; color: var(--ink); opacity: .82; margin: 18px 0 24px; max-width: 52ch; }
  .project-card .stats { display: flex; gap: 18px; margin-top: auto; border-top: 1px dashed var(--line); padding-top: 18px; }
  .project-card .stat .v { font-family: var(--font-display); font-size: 22px; font-weight: var(--fw-semibold); color: var(--ink); letter-spacing: -0.01em; line-height: 1.1; }
  .project-card .stat .l { font-size: 11px; color: var(--ink-muted); letter-spacing: 0.04em; text-transform: uppercase; margin-top: 4px; }

  /* ── Thumb variants ── */
  .thumb { height: 220px; border-radius: var(--radius-lg); position: relative; overflow: hidden; margin: 4px 0; border: 1px solid var(--line); }
  .thumb.tradewind {
    background: radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 50%),
                linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-700) 100%);
  }
  .thumb.tradewind .layer { position: absolute; inset: 32px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.10); border-radius: 6px; backdrop-filter: blur(4px); }
  .thumb.tradewind .layer::before, .thumb.tradewind .layer::after { content: ""; position: absolute; left: 16px; right: 16px; background: rgba(255,255,255,.10); border-radius: 3px; height: 8px; }
  .thumb.tradewind .layer::before { top: 18px; width: 50%; background: var(--accent); }
  .thumb.tradewind .layer::after  { top: 36px; height: 4px; }
  .thumb.tradewind .bars { position: absolute; left: 48px; right: 48px; bottom: 48px; display: flex; gap: 8px; align-items: flex-end; height: 70px; }
  .thumb.tradewind .bars span { flex: 1; background: rgba(255,255,255,.20); border-radius: 2px 2px 0 0; }
  .thumb.tradewind .bars span:nth-child(3) { background: var(--accent); }

  .thumb.larch { background: var(--color-gray-50); display: flex; align-items: center; justify-content: center; }
  .thumb.larch .doc { width: 56%; aspect-ratio: 3/4; background: var(--surface-card); border-radius: 6px; box-shadow: 0 18px 40px -16px rgba(8,40,59,.18); position: relative; padding: 18px 16px; display: flex; flex-direction: column; gap: 8px; border: 1px solid var(--line); }
  .thumb.larch .doc .ln { height: 6px; background: var(--color-gray-200); border-radius: 2px; }
  .thumb.larch .doc .ln.title { width: 60%; height: 9px; background: var(--ink); margin-bottom: 6px; }
  .thumb.larch .doc .ln.short { width: 35%; }
  .thumb.larch .lock { position: absolute; top: -14px; right: -14px; width: 40px; height: 40px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 10px 24px -8px color-mix(in srgb, var(--accent) 50%, transparent); }

  .thumb.voyager { background: linear-gradient(135deg, #0E2434 0%, #08283B 100%); position: relative; }
  .thumb.voyager .chart { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 40px 28px; }
  .thumb.voyager svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .thumb.voyager .badge { position: absolute; top: 18px; left: 18px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); color: #fff; padding: 6px 10px; border-radius: 20px; font-family: var(--font-mono); font-size: 11px; display: inline-flex; align-items: center; gap: 6px; }
  .thumb.voyager .badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--color-success-500); }

  .thumb-tag { position: absolute; left: 18px; bottom: 18px; background: rgba(0,0,0,.45); color: #fff; padding: 4px 10px; border-radius: 20px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; backdrop-filter: blur(6px); }

  /* ── List rows ── */
  .proj-row { display: grid; grid-template-columns: 80px minmax(0,2fr) minmax(0,2fr) minmax(0,1.2fr) auto; gap: 28px; align-items: center; padding: 28px 0; border-bottom: 1px solid var(--line); cursor: pointer; transition: 160ms var(--easing-default); color: var(--ink); }
  .proj-row:hover { padding-left: 12px; padding-right: 12px; background: var(--surface-alt); }
  .proj-row .yr { font-family: var(--font-mono); font-size: 12px; color: var(--ink-muted); letter-spacing: 0.04em; }
  .proj-row .ttl { font-family: var(--font-display); font-size: 22px; font-weight: var(--fw-semibold); letter-spacing: -0.015em; }
  .proj-row .ttl small { display: block; font-family: var(--font-body); font-weight: var(--fw-regular); font-size: 12px; color: var(--ink-muted); margin-top: 4px; }
  .proj-row .desc { font-size: 14px; color: var(--ink-muted); line-height: 1.55; }
  .proj-row .tg { display: flex; gap: 6px; flex-wrap: wrap; }
  .proj-row .arr { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; color: var(--ink-muted); transition: 160ms var(--easing-default); }
  .proj-row:hover .arr { background: var(--accent); color: #fff; border-color: var(--accent); transform: rotate(-45deg); }
  @media (max-width: 900px) { .proj-row { grid-template-columns: 60px 1fr auto; gap: 16px; } .proj-row .desc, .proj-row .tg { display: none; } }
</style>

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
