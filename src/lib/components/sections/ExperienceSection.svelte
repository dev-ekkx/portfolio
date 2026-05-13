<script lang="ts">
	import type { ExperienceItem } from '$lib/interfaces';

	interface Props {
		experience: ExperienceItem[];
	}

	let { experience }: Props = $props();
</script>

<style>
  .timeline { position: relative; padding-left: 28px; max-width: 880px; }
  .timeline::before { content: ""; position: absolute; left: 7px; top: 12px; bottom: 12px; width: 1px; background: var(--line); }
  .tl-item { position: relative; padding: 22px 0 22px 28px; display: grid; grid-template-columns: 140px minmax(0,1fr) auto; gap: 24px; align-items: baseline; }
  .tl-item::before { content: ""; position: absolute; left: -28px; top: 28px; width: 14px; height: 14px; border-radius: 50%; background: var(--surface); border: 2px solid var(--accent); }
  .tl-item.current::before { background: var(--accent); }
  .tl-item.current::after { content: ""; position: absolute; left: -28px; top: 28px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); opacity: .25; animation: blink 2.4s infinite ease-in-out; }
  .tl-item .when { font-family: var(--font-mono); font-size: 12px; color: var(--ink-muted); letter-spacing: 0.04em; }
  .tl-item .role { font-family: var(--font-display); font-size: 22px; font-weight: var(--fw-semibold); letter-spacing: -0.015em; color: var(--ink); margin: 0; }
  .tl-item .co { font-family: var(--font-body); font-size: 14px; color: var(--ink-muted); margin-top: 4px; }
  .tl-item .body { font-size: 14.5px; line-height: 1.6; color: var(--ink); opacity: .82; margin: 8px 0 0; }
  .tl-item .place { font-family: var(--font-mono); font-size: 11px; color: var(--ink-muted); justify-self: end; text-transform: uppercase; letter-spacing: 0.04em; }
  @media (max-width: 720px) { .tl-item { grid-template-columns: 1fr; gap: 6px; } .tl-item .place { justify-self: start; } }
</style>

<section id="experience" class="p-section">
	<div class="shell">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">03 · Experience</span>
				<h2 class="section-title">Where I've done the work.</h2>
			</div>
			<p class="lead">
				Three roles, one company, a consistent pattern: own the problem end-to-end, ship it,
				measure it, repeat.
			</p>
		</div>
		<div class="timeline">
			{#each experience as e}
				<div class={`tl-item reveal ${e.current ? 'current' : ''}`}>
					<span class="when">{e.when}</span>
					<div>
						<h3 class="role">{e.role}</h3>
						<div class="co">{e.co}</div>
						<p class="body">{e.body}</p>
					</div>
					<span class="place">{e.place}</span>
				</div>
			{/each}
		</div>
		<div class="reveal">
			<a
				href="/resume.pdf"
				class="btn btn-ghost"
				style="margin-top:48px;display:inline-flex;"
				target="_blank"
				rel="noreferrer"
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
					><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path
						d="M7 10l5 5 5-5"
					/><path d="M12 15V3" /></svg
				>
				Download resume (PDF)
			</a>
		</div>
	</div>
</section>
