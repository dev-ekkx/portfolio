<script lang="ts">
	import type { ExperienceItem } from '$lib/types';

	interface Props {
		experience: ExperienceItem[];
	}

	let { experience }: Props = $props();
</script>

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
