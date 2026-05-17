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

<style>
  /* Active link underline animation */
  .nav-links a.active::after {
    content: "";
    position: absolute;
    left: 22px;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    animation: navDash 220ms var(--easing-default);
  }
  @keyframes navDash {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); }
  }

  /* Hamburger open-state transforms (nth-child not expressible per-element in Tailwind) */
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
</style>

<svelte:window onkeydown={handleKeydown} />

<nav
  class="sticky top-0 z-[200] backdrop-saturate-[180%] backdrop-blur-[10px]
         border-b transition-colors duration-200
         {onCanvas
           ? 'bg-canvas/70 border-canvas-line text-canvas-fg'
           : 'bg-surface/85 border-line'}"
>
	<div class="container flex items-center justify-between h-[68px]">
		<!-- Brand -->
		<button
			class="flex items-center gap-[10px]
			       font-[family-name:var(--font-display)] font-semibold
			       text-[16px] tracking-[-0.01em] cursor-pointer
			       bg-transparent border-0 text-inherit"
			onclick={() => { onScrollToAnchor('top'); closeMenu(); }}
		>
			<span
				class="w-7 h-7 rounded-[7px]
				       bg-accent-site text-white
				       inline-flex items-center justify-center
				       font-[family-name:var(--font-display)] font-bold
				       text-[12px] tracking-normal"
			>{person.initials}</span>
			<span>{person.name}<span class="text-accent-site">.</span></span>
		</button>

		<!-- Desktop nav links — hidden at max-[720px] -->
		<div
			class="nav-links flex items-center gap-7
			       font-[family-name:var(--font-body)] text-[14px] font-medium
			       max-[720px]:hidden"
		>
			{#each navSections as s}
				<a
					href={`#${s.id}`}
					class="relative text-inherit opacity-[.68] py-[6px] cursor-pointer
					       transition-opacity duration-200 transition-colors
					       hover:opacity-100
					       {activeId === s.id ? 'active opacity-100 text-accent-site' : ''}"
					onclick={(e) => {
						e.preventDefault();
						onScrollToAnchor(s.id);
					}}
				>
					<span
						class="font-[family-name:var(--font-mono)] text-[11px] mr-[6px] opacity-[.55]
						       transition-opacity duration-200 transition-colors
						       {activeId === s.id ? 'opacity-100 text-accent-site' : ''}"
					>{s.num}</span>{s.label}
				</a>
			{/each}
		</div>

		<!-- Right side -->
		<div class="flex items-center gap-3">
			<!-- CTA button — hidden at max-[720px] -->
			<button
				class="nav-cta inline-flex items-center gap-2
				       px-4 py-[10px] rounded-md
				       bg-accent-site text-white
				       text-[13px] font-medium border-0 cursor-pointer
				       transition-colors duration-[120ms] ease-out
				       hover:bg-accent-strong
				       max-[720px]:hidden"
				onclick={onOpenCmdPalette}
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
					><path
						d="M15 6h3a3 3 0 1 1-3 3V6zM9 6h6v12H9zM9 6V9a3 3 0 1 1-3-3h3zm0 12H6a3 3 0 1 1 3-3v3zm6 0v-3a3 3 0 1 1 3 3h-3z"
					/></svg
				>
				Quick nav
				<span
					class="opacity-70 font-[family-name:var(--font-mono)] text-[11px] ml-1"
				>⌘K</span>
			</button>

			<!-- Hamburger — hidden on desktop, visible at max-[720px] -->
			<button
				class="hamburger hidden max-[720px]:flex flex-col justify-center items-center
				       gap-[5px] w-10 h-10 p-0
				       bg-transparent border border-line rounded-md
				       cursor-pointer text-inherit
				       {menuOpen ? 'open' : ''}"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
			>
				<span class="block w-[18px] h-[1.5px] bg-current rounded-[2px] origin-center transition-all duration-[240ms]"></span>
				<span class="block w-[18px] h-[1.5px] bg-current rounded-[2px] origin-center transition-all duration-[240ms]"></span>
				<span class="block w-[18px] h-[1.5px] bg-current rounded-[2px] origin-center transition-all duration-[240ms]"></span>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile overlay — hidden by default, shown at max-[720px] -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 z-[199]
	       bg-black/45 backdrop-blur-[2px]
	       transition-opacity duration-[280ms]
	       hidden max-[720px]:block
	       {menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
	onclick={closeMenu}
></div>

<!-- Mobile drawer — hidden by default, shown at max-[720px] -->
<div
	class="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] z-[200]
	       bg-surface border-l border-line
	       pt-[88px] px-8 pb-12 flex-col gap-0
	       shadow-[-8px_0_32px_rgba(0,0,0,0.18)]
	       transition-transform duration-300
	       hidden max-[720px]:flex
	       {menuOpen ? 'translate-x-0' : 'translate-x-full'}"
	aria-hidden={!menuOpen}
>
	<nav class="flex flex-col gap-1 flex-1">
		{#each navSections as s}
			<a
				href={`#${s.id}`}
				class="flex items-center gap-[14px]
				       py-[14px] border-b border-line last:border-b-0
				       font-[family-name:var(--font-display)] text-[18px] font-semibold
				       text-inherit opacity-[.65] cursor-pointer
				       transition-opacity duration-[180ms] ease transition-colors
				       hover:opacity-100 hover:text-accent-site
				       {activeId === s.id ? 'opacity-100 text-accent-site' : ''}"
				onclick={(e) => {
					e.preventDefault();
					handleNavClick(s.id);
				}}
			>
				<span
					class="font-[family-name:var(--font-mono)] text-[11px] opacity-[.5]
					       {activeId === s.id ? 'opacity-100 text-accent-site' : ''}"
				>{s.num}</span>
				<span class="label">{s.label}</span>
			</a>
		{/each}
	</nav>
	<button
		class="inline-flex items-center gap-[10px]
		       px-5 py-3 mt-8
		       rounded-md border border-line
		       bg-transparent text-inherit text-[14px] font-medium
		       cursor-pointer
		       transition-colors duration-[120ms] ease
		       hover:bg-surface-alt hover:border-accent-site"
		onclick={() => { onOpenCmdPalette(); closeMenu(); }}
	>
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
		<kbd
			class="font-[family-name:var(--font-mono)] text-[11px]
			       px-[6px] py-[2px] border border-line rounded-[4px]
			       ml-auto opacity-60"
		>⌘K</kbd>
	</button>
</div>
