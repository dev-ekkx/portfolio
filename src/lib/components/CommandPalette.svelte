<script lang="ts">
	import type { CmdItem } from '$lib/interfaces';
	import searchIcon from '$lib/components/icons/search.svg?raw';
	import codeIcon from '$lib/components/icons/code.svg?raw';
	import sparklesIcon from '$lib/components/icons/sparkles.svg?raw';
	import briefcaseIcon from '$lib/components/icons/briefcase.svg?raw';
	import packageIcon from '$lib/components/icons/package.svg?raw';
	import mailIcon from '$lib/components/icons/mail.svg?raw';
	import githubIcon from '$lib/components/icons/github.svg?raw';
	import linkedinIcon from '$lib/components/icons/linkedin.svg?raw';

	interface Props {
		open: boolean;
		cmdItems: CmdItem[];
		onClose: () => void;
		onSelect: (item: CmdItem) => void;
	}

	let { open, cmdItems, onClose, onSelect }: Props = $props();

	let cmdQuery = $state('');
	let cmdActive = $state(0);
	let cmdInputRef: HTMLInputElement;

	let filteredCmdItems = $derived(
		cmdQuery.trim() === ''
			? cmdItems
			: cmdItems.filter((c) => c.label.toLowerCase().includes(cmdQuery.trim().toLowerCase()))
	);

	$effect(() => {
		if (open) {
			cmdQuery = '';
			cmdActive = 0;
			setTimeout(() => cmdInputRef?.focus(), 60);
		}
	});

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			cmdActive = Math.min(filteredCmdItems.length - 1, cmdActive + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			cmdActive = Math.max(0, cmdActive - 1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const item = filteredCmdItems[cmdActive];
			if (item) onSelect(item);
		} else if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<div
	class="fixed inset-0 z-1100 flex items-start justify-center bg-[rgba(8,40,59,0.5)] pt-[14vh] backdrop-blur-sm transition-all duration-200 {open
		? 'pointer-events-auto opacity-100'
		: 'pointer-events-none opacity-0'}"
	onclick={onClose}
	onkeydown={(e) => {
		if (e.key === 'Escape') onClose();
	}}
	role="dialog"
	tabindex="-1"
	aria-modal="true"
	aria-label="Command palette"
>
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="bg-surface-card border-line w-140 max-w-[92vw] overflow-hidden rounded-xl border shadow-(--shadow-2xl) transition-transform duration-220 {open
			? 'translate-y-0'
			: 'translate-y-2'}"
		role="button"
		onclick={(e) => e.stopPropagation()}
	>
		<div class="border-line flex items-center gap-3 border-b px-4.5 py-4">
			<span class="text-ink-muted shrink-0">{@html searchIcon}</span>
			<input
				bind:this={cmdInputRef}
				placeholder="Where to?"
				bind:value={cmdQuery}
				onkeydown={handleKey}
				oninput={() => (cmdActive = 0)}
				class="text-ink placeholder:text-ink-muted/60 flex-1 border-0 bg-transparent [font-family:var(--font-body)] text-base outline-none"
			/>
			<kbd class="border-line text-ink-muted rounded border px-2 py-0.75 font-mono text-[11px]"
				>esc</kbd
			>
		</div>

		<div class="max-h-[56vh] overflow-auto p-2">
			{#if filteredCmdItems.length === 0}
				<div class="text-ink-muted px-3.5 py-5 text-[13px]">
					No matches. Try "work", "stack", or "github".
				</div>
			{/if}
			{#each filteredCmdItems as item, i}
				<button
					class="text-ink flex cursor-pointer items-center gap-3.5 rounded-md px-3.5 py-3 text-sm transition-colors duration-100 {i ===
					cmdActive
						? 'bg-surface-alt'
						: 'hover:bg-surface-alt'}"
					role="option"
					tabindex="0"
					aria-selected={i === cmdActive}
					onmouseenter={() => (cmdActive = i)}
					onclick={() => onSelect(item)}
				>
					<span class="text-accent-site inline-flex shrink-0">
						{#if item.ico === 'code'}{@html codeIcon}{/if}
						{#if item.ico === 'sparkles'}{@html sparklesIcon}{/if}
						{#if item.ico === 'briefcase'}{@html briefcaseIcon}{/if}
						{#if item.ico === 'package'}{@html packageIcon}{/if}
						{#if item.ico === 'mail'}{@html mailIcon}{/if}
						{#if item.ico === 'github'}{@html githubIcon}{/if}
						{#if item.ico === 'linkedin'}{@html linkedinIcon}{/if}
					</span>
					{item.label}
					<span class="text-ink-muted ml-auto font-mono text-[11px]">{item.meta}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
