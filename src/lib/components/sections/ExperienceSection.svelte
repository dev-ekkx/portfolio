<script lang="ts">
	import type { ExperienceItem } from '$lib/interfaces';
	import Button from '$lib/components/ui/button/button.svelte';

	interface Props {
		experience: ExperienceItem[];
	}

	let { experience }: Props = $props();
</script>

<style>
  .timeline::before { content: ""; position: absolute; left: 7px; top: 12px; bottom: 12px; width: 1px; background: var(--line); }
  .tl-item::before { content: ""; position: absolute; left: -28px; top: 28px; width: 14px; height: 14px; border-radius: 50%; background: var(--surface); border: 2px solid var(--accent); }
  .tl-item.current::before { background: var(--accent); }
  .tl-item.current::after { content: ""; position: absolute; left: -28px; top: 28px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); opacity: .25; animation: blink 2.4s infinite ease-in-out; }
</style>

<section id="experience" class="p-section">
	<div class="container">
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
		<div class="timeline relative pl-7 max-w-[880px]">
			{#each experience as e}
				<div class="tl-item reveal {e.current ? 'current' : ''} relative py-[22px] pl-7 grid grid-cols-[140px_minmax(0,1fr)_auto] max-[720px]:grid-cols-1 gap-6 max-[720px]:gap-[6px] items-baseline">
					<span class="[font-family:var(--font-mono)] text-[12px] text-ink-muted tracking-[0.04em]">{e.when}</span>
					<div>
						<h3 class="[font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.015em] text-ink m-0">{e.role}</h3>
						<div class="text-[14px] text-ink-muted mt-1">{e.co}</div>
						<p class="text-[14.5px] leading-[1.6] text-ink/[0.82] mt-2 mb-0">{e.body}</p>
					</div>
					<span class="[font-family:var(--font-mono)] text-[11px] text-ink-muted justify-self-end max-[720px]:justify-self-start uppercase tracking-[0.04em]">{e.place}</span>
				</div>
			{/each}
		</div>
		<div class="reveal">
			<Button
				variant="ghost-surface"
				size="site"
				href="/resume.pdf"
				class="mt-12"
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
			</Button>
		</div>
	</div>
</section>
