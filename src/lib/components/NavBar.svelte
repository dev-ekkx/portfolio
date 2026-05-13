<script lang="ts">
	import type { Person } from '$lib/interfaces';
	import type { NavSection } from '$lib/types';

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

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}

	function handleNavClick(id: string) {
		onScrollToAnchor(id);
		closeMenu();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeMenu();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class={`nav ${onCanvas ? 'on-canvas' : ''}`}>
	<div class="shell nav-inner">
		<button
			class="brand"
			onclick={() => { onScrollToAnchor('top'); closeMenu(); }}
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

		<div class="nav-right">
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

			<button
				class={`hamburger ${menuOpen ? 'open' : ''}`}
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile drawer -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={`mob-overlay ${menuOpen ? 'open' : ''}`} onclick={closeMenu}></div>

<div class={`mob-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
	<nav class="mob-nav">
		{#each navSections as s}
			<a
				href={`#${s.id}`}
				class={activeId === s.id ? 'active' : ''}
				onclick={(e) => {
					e.preventDefault();
					handleNavClick(s.id);
				}}
			>
				<span class="num">{s.num}</span>
				<span class="label">{s.label}</span>
			</a>
		{/each}
	</nav>
	<button class="mob-cmd" onclick={() => { onOpenCmdPalette(); closeMenu(); }}>
		<svg
			width="15"
			height="15"
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
		<kbd>⌘K</kbd>
	</button>
</div>
