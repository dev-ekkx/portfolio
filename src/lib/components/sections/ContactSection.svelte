<script lang="ts">
	import type { Person } from '$lib/interfaces';

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

<style>
  /* ── CTA ::before radial gradient overlay ── */
  .cta::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 50%);
    pointer-events: none;
  }

  /* ── or-divider hr lines ── */
  .or-divider::before,
  .or-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--canvas-line);
  }

  /* ── Sending dots animation ── */
  .dot-pulse {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #fff;
    animation: dp 1.2s infinite ease-in-out;
  }
  @keyframes dp { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
</style>

<!-- CTA section -->
<section
	id="contact"
	class="cta bg-canvas text-canvas-fg relative overflow-hidden pt-[140px] pb-[96px]"
>
	<div class="container">
		<div class="section-title-row reveal">
			<div class="left">
				<span class="eyebrow">05 · Contact</span>
				<h2 class="section-title">Have a problem worth <span class="text-accent-site">solving?</span></h2>
			</div>
			<p class="lead text-canvas-fg-muted">
				I'm open to senior full-stack and platform engineering roles starting Q3 2026, and short
				consulting engagements year-round. Especially keen on fintech, logistics, and developer
				tooling.
			</p>
		</div>

		<!-- contact grid -->
		<div class="reveal grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-[80px] items-start max-[880px]:grid-cols-1 max-[880px]:gap-[48px]">

			<!-- left side -->
			<div class="contact-side">
				<!-- email card -->
				<button
					class="inline-flex items-center gap-4 px-4 py-[14px] pl-5 bg-white/[0.04] border border-canvas-line rounded-md text-canvas-fg [font-family:var(--font-mono)] text-[14px] cursor-pointer transition-all duration-[160ms] w-full hover:bg-white/[0.08] hover:border-accent-site"
					onclick={copyEmail}
				>
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
					<span class="flex-1 text-left">{person.email}</span>
					<span class="inline-flex items-center gap-[6px] px-[10px] py-[6px] border-l border-canvas-line ml-[6px] text-canvas-fg-muted text-[11px] tracking-[0.04em] uppercase">
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

				<!-- or divider -->
				<div class="or-divider [font-family:var(--font-mono)] text-[11px] tracking-[0.1em] uppercase text-canvas-fg-muted mt-7 mb-[18px] flex items-center gap-3">
					or find me on
				</div>

				<!-- quick links -->
				<div class="flex flex-col gap-3 mt-2">
					<a
						href={person.links.linkedin}
						target="_blank"
						rel="noreferrer"
						class="flex items-center gap-[14px] px-[18px] py-[14px] border border-canvas-line rounded-md bg-white/[0.03] text-canvas-fg text-[14px] font-medium transition-all duration-[160ms] hover:border-accent-site hover:bg-white/[0.06] hover:-translate-y-px"
					>
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
						<span class="flex-1">LinkedIn</span>
						<span class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.04em]">/in/emmanuelkpendo</span>
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
					<a
						href={person.links.github}
						target="_blank"
						rel="noreferrer"
						class="flex items-center gap-[14px] px-[18px] py-[14px] border border-canvas-line rounded-md bg-white/[0.03] text-canvas-fg text-[14px] font-medium transition-all duration-[160ms] hover:border-accent-site hover:bg-white/[0.06] hover:-translate-y-px"
					>
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
						<span class="flex-1">GitHub</span>
						<span class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.04em]">@emmanuelkpendo</span>
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
					<a
						href={`mailto:${person.email}`}
						class="flex items-center gap-[14px] px-[18px] py-[14px] border border-canvas-line rounded-md bg-white/[0.03] text-canvas-fg text-[14px] font-medium transition-all duration-[160ms] hover:border-accent-site hover:bg-white/[0.06] hover:-translate-y-px"
					>
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
						<span class="flex-1">Email</span>
						<span class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.04em]">{person.email}</span>
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

			<!-- right side: form or success state -->
			{#if formStatus === 'sent'}
				<div class="bg-white/[0.03] border border-canvas-line rounded-xl p-8 grid gap-[18px] relative backdrop-blur-[8px] min-h-[380px] flex flex-col justify-center items-center text-center gap-4">
					<div class="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--color-success-500)_18%,transparent)] inline-flex items-center justify-center text-[var(--color-success-500)]">
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
					<h3 class="[font-family:var(--font-display)] text-canvas-fg m-0 text-[24px] font-semibold">
						Got it, thanks.
					</h3>
					<p class="text-canvas-fg-muted m-0 text-[14px] max-w-[36ch]">
						I'll reply within two working days. If it's urgent, drop me a line at
						<a href={`mailto:${person.email}`} class="text-accent-site">{person.email}</a>.
					</p>
					<button
						class="inline-flex items-center gap-[10px] px-[22px] py-[14px] border-0 rounded-md bg-accent-site text-white [font-family:var(--font-body)] text-[14px] font-medium cursor-pointer transition-all duration-[160ms] mt-[10px] hover:bg-accent-strong hover:-translate-y-px"
						onclick={() => (formStatus = 'idle')}
					>
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
				<form
					class="bg-white/[0.03] border border-canvas-line rounded-xl p-8 grid gap-[18px] relative backdrop-blur-[8px]"
					onsubmit={submitForm}
					novalidate
				>
					<!-- row: name + email -->
					<div class="grid grid-cols-2 gap-4 max-[540px]:grid-cols-1">
						<!-- name field -->
						<div class="flex flex-col gap-2">
							<label
								for="cf-name"
								class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
							>
								Name <span class="text-accent-site">*</span>
							</label>
							<input
								id="cf-name"
								placeholder="Ada Lovelace"
								bind:value={formData.name}
								autocomplete="name"
								class="[font-family:var(--font-body)] text-[15px] text-canvas-fg bg-white/[0.04] border rounded-md px-[14px] py-3 outline-none transition-all duration-[160ms] w-full resize-y focus:border-accent-site focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)] placeholder:text-white/[0.32] {formErrors.name ? 'border-[var(--color-error-500)]' : 'border-canvas-line'}"
							/>
							{#if formErrors.name}<span class="text-[12px] text-[var(--color-error-500)]">{formErrors.name}</span>{/if}
						</div>
						<!-- email field -->
						<div class="flex flex-col gap-2">
							<label
								for="cf-email"
								class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
							>
								Email <span class="text-accent-site">*</span>
							</label>
							<input
								id="cf-email"
								type="email"
								placeholder="ada@engine.dev"
								bind:value={formData.email}
								autocomplete="email"
								class="[font-family:var(--font-body)] text-[15px] text-canvas-fg bg-white/[0.04] border rounded-md px-[14px] py-3 outline-none transition-all duration-[160ms] w-full resize-y focus:border-accent-site focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)] placeholder:text-white/[0.32] {formErrors.email ? 'border-[var(--color-error-500)]' : 'border-canvas-line'}"
							/>
							{#if formErrors.email}<span class="text-[12px] text-[var(--color-error-500)]">{formErrors.email}</span>{/if}
						</div>
					</div>

					<!-- row: company + subject -->
					<div class="grid grid-cols-2 gap-4 max-[540px]:grid-cols-1">
						<!-- company field -->
						<div class="flex flex-col gap-2">
							<label
								for="cf-co"
								class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
							>
								Company <span class="text-canvas-fg-muted font-normal normal-case tracking-normal">(optional)</span>
							</label>
							<input
								id="cf-co"
								placeholder="Where you're writing from"
								bind:value={formData.company}
								autocomplete="organization"
								class="[font-family:var(--font-body)] text-[15px] text-canvas-fg bg-white/[0.04] border border-canvas-line rounded-md px-[14px] py-3 outline-none transition-all duration-[160ms] w-full resize-y focus:border-accent-site focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)] placeholder:text-white/[0.32]"
							/>
						</div>
						<!-- subject field -->
						<div class="flex flex-col gap-2">
							<label
								for="cf-sub"
								class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
							>
								What's this about?
							</label>
							<select
								id="cf-sub"
								bind:value={formData.subject}
								class="[font-family:var(--font-body)] text-[15px] text-canvas-fg bg-white/[0.04] border border-canvas-line rounded-md px-[14px] py-3 outline-none transition-all duration-[160ms] w-full focus:border-accent-site focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
							>
								<option value="general">General hello</option>
								<option value="role">A full-time role</option>
								<option value="consulting">Short-term consulting</option>
								<option value="oss">Open-source / sponsorship</option>
								<option value="other">Something else</option>
							</select>
						</div>
					</div>

					<!-- budget options (conditional) -->
					{#if formData.subject === 'consulting' || formData.subject === 'role'}
						<div class="flex flex-col gap-2" role="group" aria-labelledby="budget-label">
							<span
								id="budget-label"
								class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
							>
								Rough budget or range
							</span>
							<div class="flex gap-[6px] flex-wrap">
								{#each budgets as b, bi}
									<input
										type="radio"
										id={`b-${bi}`}
										name="budget"
										checked={formData.budget === b}
										onchange={() => (formData.budget = b)}
										class="hidden"
									/>
									<label
										class="[font-family:var(--font-body)] text-[13px] px-[14px] py-2 border rounded-full cursor-pointer transition-all duration-[140ms] inline-flex items-center {formData.budget === b ? 'bg-accent-site border-accent-site text-white' : 'border-canvas-line text-canvas-fg-muted'}"
										for={`b-${bi}`}
									>{b}</label>
								{/each}
							</div>
						</div>
					{/if}

					<!-- message field -->
					<div class="flex flex-col gap-2">
						<label
							for="cf-msg"
							class="[font-family:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-canvas-fg-muted flex items-center justify-between"
						>
							Message <span class="text-accent-site">*</span>
						</label>
						<textarea
							id="cf-msg"
							rows="5"
							placeholder="A few sentences about what you're building, where you're stuck, or what you're hiring for."
							bind:value={formData.message}
							class="[font-family:var(--font-body)] text-[15px] text-canvas-fg bg-white/[0.04] border rounded-md px-[14px] py-3 outline-none transition-all duration-[160ms] w-full resize-y focus:border-accent-site focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_20%,transparent)] placeholder:text-white/[0.32] {formErrors.message ? 'border-[var(--color-error-500)]' : 'border-canvas-line'}"
						></textarea>
						{#if formErrors.message}
							<span class="text-[12px] text-[var(--color-error-500)]">{formErrors.message}</span>
						{:else}
							<span class="text-[11px] text-canvas-fg-muted [font-family:var(--font-mono)]">{formData.message.length} characters · plain text</span>
						{/if}
					</div>

					<!-- error banner -->
					{#if formStatus === 'error'}
						<div class="[font-family:var(--font-body)] text-[14px] flex items-center gap-3 px-[18px] py-4 rounded-md bg-[color-mix(in_srgb,var(--color-error-500)_18%,transparent)] text-canvas-fg border border-[color-mix(in_srgb,var(--color-error-500)_40%,transparent)]">
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

					<!-- submit row -->
					<div class="flex items-center justify-between mt-[6px] gap-4 flex-wrap">
						<span class="[font-family:var(--font-mono)] text-[11px] text-canvas-fg-muted tracking-[0.04em] inline-flex items-center gap-2">
							Sends through <b class="text-canvas-fg font-semibold">Resend</b> · replies within 2 days
						</span>
						<button
							type="submit"
							disabled={formStatus === 'sending'}
							class="inline-flex items-center gap-[10px] px-[22px] py-[14px] border-0 rounded-md bg-accent-site text-white [font-family:var(--font-body)] text-[14px] font-medium cursor-pointer transition-all duration-[160ms] hover:bg-accent-strong hover:-translate-y-px disabled:opacity-70 disabled:cursor-progress disabled:translate-y-0"
						>
							{#if formStatus === 'sending'}
								Sending
								<span class="inline-flex gap-1 ml-[6px]">
									{#each [0, 1, 2] as i}
										<span class="dot-pulse" style={`animation-delay:${i * 0.15}s`}></span>
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
