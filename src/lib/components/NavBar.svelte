<script lang="ts">
	import type { NavSection, Person } from '$lib/types';

	interface Props {
		activeId: string;
		onCanvas: boolean;
		person: Person;
		navSections: NavSection[];
		onScrollToAnchor: (id: string) => void;
		onOpenCmdPalette: () => void;
	}

	let { activeId, onCanvas, person, navSections, onScrollToAnchor, onOpenCmdPalette }: Props =
		$props();
</script>

<nav class={`nav ${onCanvas ? 'on-canvas' : ''}`}>
	<div class="shell nav-inner">
		<button
			class="brand"
			onclick={() => onScrollToAnchor('top')}
			style="background: none; border: none; color: inherit;"
		>
			<span class="mono">{person.initials}</span>
			<span>{person.name}<span class="dot">.</span></span>
		</button>
		<div class="nav-links">
			{#each navSections as s}
				<a
					href={`#${s.id}`}
					class={activeId === s.id ? 'active' : ''}
					onclick={(e) => {
						e.preventDefault();
						onScrollToAnchor(s.id);
					}}
				>
					<span class="num">{s.num}</span>{s.label}
				</a>
			{/each}
		</div>
		<button class="nav-cta" onclick={onOpenCmdPalette}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path
					d="M15 6h3a3 3 0 1 1-3 3V6zM9 6h6v12H9zM9 6V9a3 3 0 1 1-3-3h3zm0 12H6a3 3 0 1 1 3-3v3zm6 0v-3a3 3 0 1 1 3 3h-3z"
				/></svg
			>
			Quick nav
			<span style="opacity:.7;font-family:var(--font-mono);font-size:11px;margin-left:4px;">⌘K</span>
		</button>
	</div>
</nav>
