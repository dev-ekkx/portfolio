<script lang="ts">
	import type { Person } from '$lib/interfaces';

	interface Props {
		person: Person;
	}

	let { person }: Props = $props();
</script>

<footer class="p-footer">
	<div class="shell footer-inner">
		<span>© 2026 {person.name}, built with care in Accra</span>
		<div class="socials">
			<a href={person.links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
				<svg
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
				>
			</a>
			<a href={person.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
				<svg
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
				>
			</a>
			<a href={person.links.twitter} aria-label="Twitter / X" target="_blank" rel="noreferrer">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M18 4 14 10l5 10h-3l-3-6-4.5 6H6l5-6-5-10h4l3 6 5-6z" /></svg
				>
			</a>
		</div>
		<span style="font-family:var(--font-mono);">v2026.05 · all systems nominal</span>
	</div>
</footer>
