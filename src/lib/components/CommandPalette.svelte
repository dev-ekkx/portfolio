<script lang="ts">
	import type { CmdItem } from '$lib/interfaces';

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
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="text-ink-muted shrink-0"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg
			>
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
						{#if item.ico === 'code'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></svg
							>{/if}
						{#if item.ico === 'sparkles'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6 4 4M20 20l-1.6-1.6M5.6 18.4 4 20M20 4l-1.6 1.6"
								/><circle cx="12" cy="12" r="3" /></svg
							>{/if}
						{#if item.ico === 'briefcase'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="2" y="7" width="20" height="14" rx="2" /><path
									d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
								/></svg
							>{/if}
						{#if item.ico === 'package'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="m7.5 4.27 9 5.15" /><path
									d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
								/><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></svg
							>{/if}
						{#if item.ico === 'mail'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
								/><path d="m22 6-10 7L2 6" /></svg
							>{/if}
						{#if item.ico === 'github'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
								/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
							>{/if}
						{#if item.ico === 'linkedin'}<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><path
									d="M2 9h4v12H2z"
								/><circle cx="4" cy="4" r="2" /></svg
							>{/if}
					</span>
					{item.label}
					<span class="text-ink-muted ml-auto font-mono text-[11px]">{item.meta}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
