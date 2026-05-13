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
  .nav {
    position: sticky; top: 0; z-index: var(--z-sticky);
    background: color-mix(in srgb, var(--surface) 85%, transparent);
    backdrop-filter: saturate(180%) blur(10px);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .nav.on-canvas {
    background: color-mix(in srgb, var(--canvas) 70%, transparent);
    border-bottom-color: var(--canvas-line);
    color: var(--canvas-fg);
  }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
  .brand {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-weight: var(--fw-semibold);
    font-size: 16px; letter-spacing: -0.01em; cursor: pointer;
  }
  .brand .mono {
    width: 28px; height: 28px; border-radius: 7px;
    background: var(--accent); color: var(--color-white);
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: var(--fw-bold);
    font-size: 12px; letter-spacing: 0;
  }
  .brand .dot { color: var(--accent); }
  .nav-links { display: flex; align-items: center; gap: 28px; font-family: var(--font-body); font-size: 14px; font-weight: var(--fw-medium); }
  .nav-links a {
    position: relative; color: inherit; opacity: .68;
    transition: opacity 200ms var(--easing-default), color 200ms var(--easing-default);
    padding: 6px 0; cursor: pointer;
  }
  .nav-links a:hover { opacity: 1; }
  .nav-links a.active { opacity: 1; color: var(--accent); }
  .nav-links a.active .num { opacity: 1; color: var(--accent); }
  .nav-links a.active::after {
    content: ""; position: absolute; left: 22px; right: 0; bottom: -2px;
    height: 2px; background: var(--accent); border-radius: 2px;
    animation: navDash 220ms var(--easing-default);
  }
  @keyframes navDash {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); }
  }
  .nav-links a .num { font-family: var(--font-mono); font-size: 11px; margin-right: 6px; opacity: .55; transition: opacity 200ms var(--easing-default), color 200ms var(--easing-default); }
  .nav-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 16px; border-radius: var(--radius-md);
    background: var(--accent); color: var(--color-white);
    font-size: 13px; font-weight: var(--fw-medium);
    border: 0; cursor: pointer; transition: 120ms ease-out;
  }
  .nav-cta:hover { background: var(--accent-strong); }
  .nav-right { display: flex; align-items: center; gap: 12px; }

  /* Hamburger — hidden on desktop */
  .hamburger {
    display: none; flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 40px; height: 40px; padding: 0;
    background: none; border: 1px solid var(--line); border-radius: var(--radius-md);
    cursor: pointer; color: inherit;
  }
  .hamburger span {
    display: block; width: 18px; height: 1.5px;
    background: currentColor; border-radius: 2px; transform-origin: center;
    transition: transform 240ms var(--easing-default), opacity 240ms var(--easing-default), width 240ms var(--easing-default);
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* Overlay backdrop */
  .mob-overlay {
    display: none; position: fixed; inset: 0; z-index: calc(var(--z-sticky) - 1);
    background: rgba(0,0,0,0.45); backdrop-filter: blur(2px);
    opacity: 0; transition: opacity 280ms var(--easing-default);
  }
  .mob-overlay.open { opacity: 1; }

  /* Slide-in drawer */
  .mob-drawer {
    display: none; position: fixed; top: 0; right: 0; bottom: 0;
    width: min(320px, 85vw); z-index: var(--z-sticky);
    background: var(--surface); border-left: 1px solid var(--line);
    padding: 88px 32px 48px; flex-direction: column; gap: 0;
    transform: translateX(100%); transition: transform 300ms var(--easing-default);
    box-shadow: -8px 0 32px rgba(0,0,0,0.18);
  }
  .mob-drawer.open { transform: translateX(0); }

  .mob-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .mob-nav a {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--line);
    font-family: var(--font-display); font-size: 18px; font-weight: var(--fw-semibold);
    color: inherit; opacity: .65; cursor: pointer;
    transition: opacity 180ms ease, color 180ms ease;
  }
  .mob-nav a:last-child { border-bottom: none; }
  .mob-nav a:hover, .mob-nav a.active { opacity: 1; color: var(--accent); }
  .mob-nav a .num { font-family: var(--font-mono); font-size: 11px; opacity: .5; }
  .mob-nav a.active .num { opacity: 1; color: var(--accent); }

  .mob-cmd {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 12px 20px; margin-top: 32px;
    border-radius: var(--radius-md); border: 1px solid var(--line);
    background: none; color: inherit; font-size: 14px;
    font-weight: var(--fw-medium); cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease;
  }
  .mob-cmd:hover { background: var(--surface-alt); border-color: var(--accent); }
  .mob-cmd kbd {
    font-family: var(--font-mono); font-size: 11px;
    padding: 2px 6px; border: 1px solid var(--line);
    border-radius: 4px; margin-left: auto; opacity: .6;
  }

  @media (max-width: 720px) {
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .hamburger { display: flex; }
    .mob-overlay { display: block; pointer-events: none; }
    .mob-overlay.open { pointer-events: auto; }
    .mob-drawer { display: flex; }
  }
</style>

<svelte:window onkeydown={handleKeydown} />

<nav class={`nav ${onCanvas ? 'on-canvas' : ''}`}>
	<div class="container nav-inner">
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
