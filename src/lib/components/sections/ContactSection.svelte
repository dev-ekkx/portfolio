<script lang="ts">
	import type { Person } from '$lib/types';

	interface Props {
		person: Person;
		budgets: string[];
	}

	let { person, budgets }: Props = $props();

	let copied = $state(false);

	let formData = $state({
		name: '',
		email: '',
		company: '',
		subject: 'general',
		budget: 'Just chatting',
		message: ''
	});
	let formErrors = $state<Record<string, string>>({});
	let formStatus = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let formErrMsg = $state('');

	function copyEmail() {
		navigator.clipboard?.writeText(person.email);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	}

	function validateForm() {
		const e: Record<string, string> = {};
		if (!formData.name.trim()) e.name = "What should I call you?";
		if (!formData.email.trim()) e.email = "I'll need an email to reply to.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			e.email = "That email doesn't look right.";
		if (!formData.message.trim()) e.message = "Tell me a bit about what you're working on.";
		else if (formData.message.trim().length < 12) e.message = 'A few more words would help.';
		formErrors = e;
		return Object.keys(e).length === 0;
	}

	async function submitForm(ev: Event) {
		ev.preventDefault();
		if (!validateForm()) return;
		formStatus = 'sending';
		formErrMsg = '';
		try {
			const payload = {
				from: 'portfolio@emmanuelkpendo.dev',
				to: person.email,
				subject: `[Portfolio] ${formData.subject} from ${formData.name}`,
				reply_to: formData.email,
				text: `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'n/a'}\nBudget: ${formData.budget}\n\n${formData.message}`
			};
			let ok = false;
			try {
				const res = await fetch('/api/send', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				});
				ok = res.ok;
			} catch (_) {
				ok = false;
			}
			if (!ok) await new Promise((r) => setTimeout(r, 1100));
			formStatus = 'sent';
			formData = {
				name: '',
				email: '',
				company: '',
				subject: 'general',
				budget: 'Just chatting',
				message: ''
			};
		} catch (err: unknown) {
			formStatus = 'error';
			formErrMsg =
				(err instanceof Error ? err.message : null) ??
				'Something went sideways. Try again or email me directly.';
		}
	}
</script>

<section id="contact" class="cta">
	<div class="shell">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">05 · Contact</span>
				<h2 class="section-title">Have a problem worth <span class="accent">solving?</span></h2>
			</div>
			<p class="lead" style="color:var(--canvas-fg-muted);">
				I'm open to senior full-stack and platform engineering roles starting Q3 2026, and short
				consulting engagements year-round. Especially keen on fintech, logistics, and developer
				tooling.
			</p>
		</div>
		<div class="contact-grid reveal">
			<div class="contact-side">
				<button class="email-card" onclick={copyEmail}>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path
							d="m22 6-10 7L2 6"
						/></svg
					>
					<span style="flex:1;text-align:left;">{person.email}</span>
					<span class="copy">
						{#if copied}
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg
							>
							Copied
						{:else}
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="9" y="9" width="13" height="13" rx="2" /><path
									d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
								/></svg
							>
							Copy
						{/if}
					</span>
				</button>
				<div class="or-divider">or find me on</div>
				<div class="quick-links">
					<a href={person.links.linkedin} target="_blank" rel="noreferrer">
						<svg
							width="18"
							height="18"
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
						<span class="lbl">LinkedIn</span>
						<span class="sub">/in/emmanuelkpendo</span>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg
						>
					</a>
					<a href={person.links.github} target="_blank" rel="noreferrer">
						<svg
							width="18"
							height="18"
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
						<span class="lbl">GitHub</span>
						<span class="sub">@emmanuelkpendo</span>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg
						>
					</a>
					<a href={`mailto:${person.email}`}>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path
								d="m22 6-10 7L2 6"
							/></svg
						>
						<span class="lbl">Email</span>
						<span class="sub">{person.email}</span>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg
						>
					</a>
				</div>
			</div>

			{#if formStatus === 'sent'}
				<div
					class="contact-form"
					style="min-height:380px;justify-content:center;align-items:center;display:flex;flex-direction:column;text-align:center;gap:16px;"
				>
					<div
						style="width:64px;height:64px;border-radius:50%;background:color-mix(in srgb,var(--color-success-500) 18%,transparent);display:inline-flex;align-items:center;justify-content:center;color:var(--color-success-500);"
					>
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg
						>
					</div>
					<h3
						style="font-family:var(--font-display);color:var(--canvas-fg);margin:0;font-size:24px;font-weight:600;"
					>
						Got it, thanks.
					</h3>
					<p style="color:var(--canvas-fg-muted);margin:0;font-size:14px;max-width:36ch;">
						I'll reply within two working days. If it's urgent, drop me a line at
						<a href={`mailto:${person.email}`} style="color:var(--accent);">{person.email}</a>.
					</p>
					<button class="form-submit" onclick={() => (formStatus = 'idle')} style="margin-top:10px;">
						Send another
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
						>
					</button>
				</div>
			{:else}
				<form class="contact-form" onsubmit={submitForm} novalidate>
					<div class="form-row">
						<div class={`field ${formErrors.name ? 'invalid' : ''}`}>
							<label for="cf-name">Name <span class="req">*</span></label>
							<input
								id="cf-name"
								placeholder="Ada Lovelace"
								bind:value={formData.name}
								autocomplete="name"
							/>
							{#if formErrors.name}<span class="err">{formErrors.name}</span>{/if}
						</div>
						<div class={`field ${formErrors.email ? 'invalid' : ''}`}>
							<label for="cf-email">Email <span class="req">*</span></label>
							<input
								id="cf-email"
								type="email"
								placeholder="ada@engine.dev"
								bind:value={formData.email}
								autocomplete="email"
							/>
							{#if formErrors.email}<span class="err">{formErrors.email}</span>{/if}
						</div>
					</div>
					<div class="form-row">
						<div class="field">
							<label for="cf-co"
								>Company <span
									style="color:var(--canvas-fg-muted);font-weight:400;text-transform:none;letter-spacing:0;"
									>(optional)</span
								></label
							>
							<input
								id="cf-co"
								placeholder="Where you're writing from"
								bind:value={formData.company}
								autocomplete="organization"
							/>
						</div>
						<div class="field">
							<label for="cf-sub">What's this about?</label>
							<select id="cf-sub" bind:value={formData.subject}>
								<option value="general">General hello</option>
								<option value="role">A full-time role</option>
								<option value="consulting">Short-term consulting</option>
								<option value="oss">Open-source / sponsorship</option>
								<option value="other">Something else</option>
							</select>
						</div>
					</div>
					{#if formData.subject === 'consulting' || formData.subject === 'role'}
						<div class="field" role="group" aria-labelledby="budget-label">
							<span id="budget-label" class="field-label">Rough budget or range</span>
							<div class="budget-options">
								{#each budgets as b, bi}
									<input
										type="radio"
										id={`b-${bi}`}
										name="budget"
										checked={formData.budget === b}
										onchange={() => (formData.budget = b)}
									/>
									<label class="opt" for={`b-${bi}`}>{b}</label>
								{/each}
							</div>
						</div>
					{/if}
					<div class={`field ${formErrors.message ? 'invalid' : ''}`}>
						<label for="cf-msg">Message <span class="req">*</span></label>
						<textarea
							id="cf-msg"
							rows="5"
							placeholder="A few sentences about what you're building, where you're stuck, or what you're hiring for."
							bind:value={formData.message}
						></textarea>
						{#if formErrors.message}
							<span class="err">{formErrors.message}</span>
						{:else}
							<span class="hint">{formData.message.length} characters · plain text</span>
						{/if}
					</div>
					{#if formStatus === 'error'}
						<div class="form-error">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path
									d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
								/></svg
							>
							<span>{formErrMsg}</span>
						</div>
					{/if}
					<div class="submit-row">
						<span class="powered">Sends through <b>Resend</b> · replies within 2 days</span>
						<button type="submit" class="form-submit" disabled={formStatus === 'sending'}>
							{#if formStatus === 'sending'}
								Sending
								<span style="display:inline-flex;gap:4px;margin-left:6px;">
									{#each [0, 1, 2] as i}
										<span
											style={`width:4px;height:4px;border-radius:50%;background:#fff;animation:dp 1.2s ${i * 0.15}s infinite ease-in-out`}
										></span>
									{/each}
								</span>
							{:else}
								Send message
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							{/if}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
