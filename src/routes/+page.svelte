<script lang="ts">
	import { onMount } from 'svelte';

	/* ── Data ── */
	const PERSON = {
		name: 'Emmanuel Kpendo',
		initials: 'EK',
		role: 'Senior Software Engineer',
		location: 'Accra, Ghana',
		email: 'hello@emmanuelkpendo.dev',
		links: {
			github: 'https://github.com/emmanuelkpendo',
			linkedin: 'https://linkedin.com/in/emmanuelkpendo',
			twitter: 'https://x.com/emmanuelkpendo'
		},
		available: 'Open to Q3 2026'
	};

	const PROJECT_TAGS = ['All', 'SaaS', 'Internal tools', 'Open Source', 'Side project'];

	const PROJECTS = [
		{
			id: 'atlas',
			year: '2025',
			title: 'Atlas Finance',
			role: 'Lead Frontend & Cloud Engineer',
			blurb:
				'Unified treasury and analytics suite for multi-entity fintech operations with real-time insights and automated compliance. Cut reporting time by 62% and improved release velocity 3x.',
			tags: ['SaaS'],
			stack: ['Next.js', 'React', 'Golang', 'Postgres', 'SQLC', 'AWS ECS'],
			stats: [
				{ v: '62%', l: 'Faster reporting' },
				{ v: '3x', l: 'Release velocity' },
				{ v: 'p95 120ms', l: 'API response' }
			],
			thumbVariant: 'tradewind',
			thumbCaption: 'Fintech SaaS · Shipped'
		},
		{
			id: 'aeron',
			year: '2024',
			title: 'Aeron Ops Console',
			role: 'Senior UI Engineer',
			blurb:
				'Operations command center for aviation logistics with predictive ETAs, live fleet health, and incident response workflows. Reduced manual dispatching by 48% and improved on-time deliveries.',
			tags: ['Internal tools'],
			stack: ['Angular', 'RxJS', 'SvelteKit', 'AWS Lambda', 'EventBridge'],
			stats: [
				{ v: '48%', l: 'Less manual dispatch' },
				{ v: '99.9%', l: 'Uptime SLA' },
				{ v: '40+', l: 'Services integrated' }
			],
			thumbVariant: 'voyager',
			thumbCaption: 'Aviation · Internal'
		},
		{
			id: 'aurora',
			year: '2023',
			title: 'Aurora Cloud Studio',
			role: 'Staff Software Engineer',
			blurb:
				'Design system and deployment toolkit for enterprise SaaS teams with automated infra provisioning and CI visibility. Accelerated new product launches from weeks to days.',
			tags: ['SaaS'],
			stack: ['Vue', 'Vite', 'Golang', 'Terraform', 'AWS RDS'],
			stats: [
				{ v: '5x', l: 'Faster launches' },
				{ v: '100%', l: 'Infra coverage' },
				{ v: '0', l: 'Manual config steps' }
			],
			thumbVariant: 'larch',
			thumbCaption: 'Cloud tools · Scaling'
		}
	];

	const EXPERIENCE = [
		{
			when: '2025 to now',
			role: 'Senior Software Engineer',
			co: 'AmaliTech, Ghana',
			body: 'Leading platform architecture, multi-tenant product scaling, and AI-powered dashboard development. Driving full-stack excellence across React, Golang, and AWS-native infrastructure.',
			place: 'Accra, GH',
			current: true
		},
		{
			when: '2023 to 2025',
			role: 'Lead Frontend Engineer',
			co: 'AmaliTech, Ghana',
			body: 'Design systems modernization and SvelteKit adoption across enterprise teams. Established component library standards and performance baselines that still guide the team today.',
			place: 'Accra, GH'
		},
		{
			when: '2021 to 2023',
			role: 'Full-stack Engineer',
			co: 'AmaliTech, Ghana',
			body: 'Cloud migration to AWS, SQLC-powered data layers, and real-time UX. Shipped end-to-end features for fintech and logistics clients with a focus on correctness and speed.',
			place: 'Accra, GH'
		}
	];

	const STACK = [
		{ name: 'Languages', note: 'Where I think', items: ['TypeScript', 'Go', 'SQL', 'Python', 'HTML/CSS'] },
		{
			name: 'Frontend',
			note: 'UI and state',
			items: ['React', 'Angular', 'Next.js', 'SvelteKit', 'Vue', 'GSAP', 'Tailwind']
		},
		{
			name: 'Backend',
			note: 'APIs and data',
			items: ['Node.js', 'Go', 'Postgres', 'Redis', 'GraphQL', 'REST', 'SQLC']
		},
		{
			name: 'Cloud / Infra',
			note: 'Ship and observe',
			items: ['AWS ECS', 'Lambda', 'S3', 'RDS', 'Terraform', 'CloudFront', 'GH Actions']
		}
	];

	const FACTS = [
		{ k: 'Currently building', v: 'Cloud-native platforms' },
		{ k: 'Currently reading', v: 'Designing Data-Intensive Apps' },
		{ k: 'Open to', v: 'Q3 2026 roles' },
		{ k: 'Time zone', v: 'GMT, UTC+0' },
		{ k: 'Last shipped', v: 'This week' },
		{ k: 'Heaviest stack', v: 'TS + Postgres + AWS' }
	];

	const NAV_SECTIONS = [
		{ id: 'work', label: 'Work', num: '01' },
		{ id: 'about', label: 'About', num: '02' },
		{ id: 'experience', label: 'Experience', num: '03' },
		{ id: 'stack', label: 'Stack', num: '04' },
		{ id: 'contact', label: 'Contact', num: '05' }
	];

	const CMD_ITEMS = [
		{ label: 'View selected work', anchor: 'work', meta: '→', ico: 'code' },
		{ label: 'Read about Emmanuel', anchor: 'about', meta: '→', ico: 'sparkles' },
		{ label: 'Browse experience', anchor: 'experience', meta: '→', ico: 'briefcase' },
		{ label: 'See the stack', anchor: 'stack', meta: '→', ico: 'package' },
		{ label: 'Get in touch', anchor: 'contact', meta: '→', ico: 'mail' },
		{ label: 'GitHub profile', href: PERSON.links.github, meta: '↗', ico: 'github' },
		{ label: 'LinkedIn profile', href: PERSON.links.linkedin, meta: '↗', ico: 'linkedin' }
	];

	const BUDGETS = ['< $5k', '$5–15k', '$15–40k', 'Just chatting'];
	const COLS = 26,
		ROWS = 14;

	/* ── State ── */
	let activeId = $state('work');
	let cmdOpen = $state(false);
	let view = $state<'cards' | 'list'>('cards');
	let filter = $state('All');
	let onCanvas = $state(true);
	let copied = $state(false);
	let cmdQuery = $state('');
	let cmdActive = $state(0);

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

	/* ── DOM refs ── */
	let svgRef: SVGSVGElement;
	let stackGridRef: HTMLElement;
	let heroInnerRef: HTMLElement;
	let cmdInputRef: HTMLInputElement;

	/* ── Derived ── */
	let filteredProjects = $derived(
		filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))
	);
	let filteredCmdItems = $derived(
		cmdQuery.trim() === ''
			? CMD_ITEMS
			: CMD_ITEMS.filter((c) => c.label.toLowerCase().includes(cmdQuery.trim().toLowerCase()))
	);

	let lenis: unknown = null;

	/* ── Helpers ── */
	function scrollToAnchor(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		if (lenis) {
			(lenis as { scrollTo: (el: Element, opts: object) => void }).scrollTo(el, {
				offset: -64,
				duration: 1.1
			});
		} else {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function copyEmail() {
		navigator.clipboard?.writeText(PERSON.email);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	}

	function validateForm() {
		const e: Record<string, string> = {};
		if (!formData.name.trim()) e.name = "What should I call you?";
		if (!formData.email.trim()) e.email = "I'll need an email to reply to.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "That email doesn't look right.";
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
				to: PERSON.email,
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

	function selectCmd(item: (typeof CMD_ITEMS)[0]) {
		if ('anchor' in item && item.anchor) scrollToAnchor(item.anchor as string);
		else if ('href' in item && item.href) window.open(item.href as string, '_blank');
		cmdOpen = false;
	}

	function openCmdPalette() {
		cmdOpen = true;
		cmdQuery = '';
		cmdActive = 0;
		setTimeout(() => cmdInputRef?.focus(), 60);
	}

	function handleCmdKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			cmdActive = Math.min(filteredCmdItems.length - 1, cmdActive + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			cmdActive = Math.max(0, cmdActive - 1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const item = filteredCmdItems[cmdActive];
			if (item) selectCmd(item);
		} else if (e.key === 'Escape') {
			cmdOpen = false;
		}
	}

	/* ── onMount: GSAP + Lenis + animations ── */
	onMount(() => {
		const cleanups: (() => void)[] = [];

		// Nav scroll state
		const onScroll = () => {
			onCanvas = window.scrollY < 80;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		cleanups.push(() => window.removeEventListener('scroll', onScroll));

		// Keyboard shortcuts
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				openCmdPalette();
			}
		};
		window.addEventListener('keydown', onKey);
		cleanups.push(() => window.removeEventListener('keydown', onKey));

		// Async init
		(async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			// Lenis smooth scroll
			const LenisClass = (window as { Lenis?: new (opts: object) => unknown }).Lenis;
			if (LenisClass) {
				const l = new LenisClass({
					duration: 1.15,
					easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					smoothWheel: true,
					smoothTouch: false
				}) as {
					raf: (t: number) => void;
					on: (ev: string, fn: unknown) => void;
					destroy: () => void;
				};
				lenis = l;
				const raf = (time: number) => {
					l.raf(time);
					requestAnimationFrame(raf);
				};
				requestAnimationFrame(raf);
				l.on('scroll', ScrollTrigger.update);
				gsap.ticker.add((time: number) => l.raf(time * 1000));
				gsap.ticker.lagSmoothing(0);
				cleanups.push(() => {
					l.destroy();
					lenis = null;
				});
			}

			// Hero text entrance
			if (heroInnerRef) {
				const lines = heroInnerRef.querySelectorAll('.hero-line');
				const subs = heroInnerRef.querySelectorAll('.hero-sub, .hero-actions, .hero-meta');
				if (lines.length)
					gsap.fromTo(
						lines,
						{ yPercent: 110, opacity: 0 },
						{ yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out', stagger: 0.14, delay: 0.15 }
					);
				if (subs.length)
					gsap.fromTo(
						subs,
						{ y: 16, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.1, delay: 0.7 }
					);
			}

			// Hero SVG grid animation
			if (svgRef) {
				const cells = svgRef.querySelectorAll('.cell');
				const nodes = svgRef.querySelectorAll('.node');
				const ring = svgRef.querySelector('.ring');
				const scan = svgRef.querySelector('.scan');
				let alive = true;
				const tids: ReturnType<typeof setTimeout>[] = [];
				const tweens: { kill?: () => void }[] = [];
				const after = (fn: () => void, ms: number) => {
					const id = setTimeout(fn, ms);
					tids.push(id);
				};

				// Entrance: nodes radiate from center
				tweens.push(
					gsap.fromTo(
						nodes,
						{ opacity: 0, attr: { r: 0 } },
						{
							opacity: 1,
							attr: { r: 0.06 },
							duration: 1.0,
							ease: 'power2.out',
							stagger: { each: 0.008, from: 'center', grid: [ROWS + 1, COLS + 1] }
						}
					)
				);

				const wave = () => {
					if (!alive) return;
					const rowStart = Math.floor(Math.random() * ROWS);
					const dir = Math.random() < 0.5 ? 1 : -1;
					const colStart = dir === 1 ? 0 : COLS - 1;
					for (let i = 0; i < COLS; i++) {
						const c = colStart + dir * i;
						const rr = rowStart + (Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? -1 : 1);
						if (rr < 0 || rr >= ROWS) continue;
						const el = cells[rr * COLS + c];
						if (!el) continue;
						const t = gsap.timeline({ delay: i * 0.04 });
						t.to(el, { opacity: 0.2, duration: 0.25, ease: 'power1.out' }).to(el, {
							opacity: 0,
							duration: 1.3,
							ease: 'power2.out'
						});
						tweens.push(t);
					}
					after(wave, 2200 + Math.random() * 1800);
				};

				const cluster = () => {
					if (!alive) return;
					const cx = Math.floor(Math.random() * COLS);
					const cy = Math.floor(Math.random() * ROWS);
					for (let dy = -2; dy <= 2; dy++) {
						for (let dx = -2; dx <= 2; dx++) {
							const rr = cy + dy,
								cc = cx + dx;
							if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
							const d = Math.hypot(dx, dy);
							if (d > 2.2 || Math.random() > 1 - d / 3) continue;
							const el = cells[rr * COLS + cc];
							if (!el) continue;
							el.classList.add('glow');
							const t = gsap.timeline({ delay: d * 0.08 });
							t.to(el, {
								opacity: Math.max(0.08, 0.5 - d * 0.14),
								duration: 0.35,
								ease: 'power2.out'
							}).to(el, {
								opacity: 0,
								duration: 1.2,
								ease: 'power2.out',
								onComplete: () => el.classList.remove('glow')
							});
							tweens.push(t);
						}
					}
					if (ring) {
						gsap.set(ring, { attr: { cx: cx + 0.5, cy: cy + 0.5, r: 0.3 }, opacity: 0.7 });
						tweens.push(
							gsap.to(ring, { attr: { r: 5.5 }, opacity: 0, duration: 2.0, ease: 'power2.out' })
						);
					}
					after(cluster, 2400 + Math.random() * 2200);
				};

				const sweep = () => {
					if (!alive) return;
					const fromLeft = Math.random() < 0.5;
					const startX = fromLeft ? 0 : COLS,
						endX = fromLeft ? COLS : 0;
					if (scan) {
						gsap.set(scan, { attr: { x1: startX, y1: 0, x2: startX, y2: ROWS }, opacity: 0.9 });
						tweens.push(
							gsap.to(scan, {
								attr: { x1: endX, x2: endX },
								duration: 1.8,
								ease: 'power2.inOut',
								onComplete: () => { gsap.to(scan, { opacity: 0, duration: 0.2 }); }
							})
						);
					}
					const order = fromLeft
						? [...Array(COLS).keys()]
						: [...Array(COLS).keys()].reverse();
					order.forEach((col, i) => {
						const delay = (i / COLS) * 1.7;
						for (let n = 0; n < 2; n++) {
							const row = Math.floor(Math.random() * ROWS);
							const el = cells[row * COLS + col];
							if (!el) continue;
							const t = gsap.timeline({ delay });
							t.to(el, { opacity: 0.4, duration: 0.18, ease: 'power2.out' }).to(el, {
								opacity: 0,
								duration: 0.9,
								ease: 'power2.out'
							});
							tweens.push(t);
						}
					});
					after(sweep, 6500 + Math.random() * 4000);
				};

				const pulseNodes = () => {
					if (!alive) return;
					const count = 4 + Math.floor(Math.random() * 5);
					const picked = new Set<Element>();
					while (picked.size < count) picked.add(nodes[Math.floor(Math.random() * nodes.length)]);
					[...picked].forEach((n, i) => {
						n.classList.add('hot');
						const t = gsap.timeline({ delay: i * 0.08 });
						t.fromTo(n, { attr: { r: 0.06 } }, { attr: { r: 0.22 }, duration: 0.35, ease: 'power2.out' }).to(
							n,
							{
								attr: { r: 0.06 },
								duration: 1.2,
								ease: 'power2.out',
								onComplete: () => n.classList.remove('hot')
							}
						);
						tweens.push(t);
					});
					after(pulseNodes, 1800 + Math.random() * 1400);
				};

				after(wave, 900);
				after(cluster, 1500);
				after(sweep, 2800);
				after(pulseNodes, 1100);

				cleanups.push(() => {
					alive = false;
					tids.forEach(clearTimeout);
					tweens.forEach((t) => t.kill?.());
				});
			}

			// Stack stagger animations
			if (stackGridRef) {
				const groups = stackGridRef.querySelectorAll('.stack-group');
				groups.forEach((g, gi) => {
					const pills = g.querySelectorAll('.stack-pill');
					gsap.fromTo(
						pills,
						{ y: 14, opacity: 0, scale: 0.92 },
						{
							y: 0,
							opacity: 1,
							scale: 1,
							duration: 0.55,
							ease: 'back.out(1.4)',
							stagger: 0.04,
							delay: gi * 0.08,
							scrollTrigger: { trigger: g, start: 'top 85%', toggleActions: 'play none none none' }
						}
					);
				});
			}

			// Scroll reveal
			document.querySelectorAll('.reveal').forEach((el) => {
				gsap.fromTo(
					el,
					{ autoAlpha: 0, y: 22 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.9,
						ease: 'power2.out',
						scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
					}
				);
			});

			// Active nav section tracking
			const triggers = NAV_SECTIONS.map((s) => {
				const el = document.getElementById(s.id);
				if (!el) return null;
				return ScrollTrigger.create({
					trigger: el,
					start: 'top 45%',
					end: 'bottom 45%',
					onToggle: (self) => {
						if (self.isActive) activeId = s.id;
					}
				});
			}).filter(Boolean);

			cleanups.push(() => triggers.forEach((t) => t?.kill()));
		})();

		return () => cleanups.forEach((f) => f());
	});
</script>

<svelte:head>
	<title>Emmanuel Kpendo | Senior Software Engineer</title>
	<meta
		name="description"
		content="Portfolio of Emmanuel Kpendo, senior full-stack engineer based in Accra, Ghana. Selected work in fintech, logistics, and cloud platforms."
	/>
</svelte:head>

<div class="portfolio">
	<!-- ── Nav ── -->
	<nav class={`nav ${onCanvas ? 'on-canvas' : ''}`}>
		<div class="shell nav-inner">
			<button
				class="brand"
				onclick={() => scrollToAnchor('top')}
				style="background: none; border: none; color: inherit;"
			>
				<span class="mono">{PERSON.initials}</span>
				<span>{PERSON.name}<span class="dot">.</span></span>
			</button>
			<div class="nav-links">
				{#each NAV_SECTIONS as s}
					<a
						href={`#${s.id}`}
						class={activeId === s.id ? 'active' : ''}
						onclick={(e) => {
							e.preventDefault();
							scrollToAnchor(s.id);
						}}
					>
						<span class="num">{s.num}</span>{s.label}
					</a>
				{/each}
			</div>
			<button class="nav-cta" onclick={openCmdPalette}>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6h3a3 3 0 1 1-3 3V6zM9 6h6v12H9zM9 6V9a3 3 0 1 1-3-3h3zm0 12H6a3 3 0 1 1 3-3v3zm6 0v-3a3 3 0 1 1 3 3h-3z" /></svg>
				Quick nav
				<span style="opacity:.7;font-family:var(--font-mono);font-size:11px;margin-left:4px;">⌘K</span>
			</button>
		</div>
	</nav>

	<!-- ── Hero ── -->
	<section class="hero" id="top">
		<div class="hero-grid-bg" aria-hidden="true"></div>
		<!-- SVG grid overlay animated by GSAP -->
		<svg
			bind:this={svgRef}
			class="hero-grid-svg"
			viewBox={`0 0 ${COLS} ${ROWS}`}
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
		>
			{#each { length: ROWS } as _, r}
				{#each { length: COLS } as _, c}
					<rect class="cell" x={c} y={r} width="1" height="1" />
				{/each}
			{/each}
			<line class="scan" x1="0" y1="0" x2="0" y2={ROWS} />
			<circle class="ring" cx="0" cy="0" r="0.3" />
			{#each { length: ROWS + 1 } as _, r}
				{#each { length: COLS + 1 } as _, c}
					<circle class="node" cx={c} cy={r} r="0.06" />
				{/each}
			{/each}
		</svg>

		<div class="shell hero-inner" bind:this={heroInnerRef}>
			<div>
				<span class="eyebrow">{PERSON.role}, est. 2017</span>
				<h1 style="overflow:hidden;">
					<span class="hero-line" style="display:block;">I build web products</span>
					<span class="hero-line" style="display:block;">that are fast, resilient,</span>
					<span class="hero-line" style="display:block;"><span class="accent">and scale.</span></span>
				</h1>
				<p class="hero-sub">
					Hi, I'm <strong style="color:var(--canvas-fg);font-weight:500;">{PERSON.name}</strong>, a
					senior full-stack engineer based in {PERSON.location}. I care about correct data models,
					fast response times, and cloud infrastructure that holds under pressure.
				</p>
				<div class="hero-actions">
					<button onclick={() => scrollToAnchor('work')} class="btn btn-primary">
						View selected work
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
					</button>
					<button onclick={() => scrollToAnchor('contact')} class="btn btn-ghost-on-canvas">
						Get in touch
					</button>
				</div>
				<div class="hero-meta">
					<span class="item live"><span class="k">STATUS</span><span class="v">{PERSON.available}</span></span>
					<span class="item"><span class="k">BASED IN</span><span class="v">Accra, GH</span></span>
					<span class="item"><span class="k">TIMEZONE</span><span class="v">GMT, UTC+0</span></span>
					<span class="item"><span class="k">SHIPPING SINCE</span><span class="v">2017</span></span>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Work ── -->
	<section id="work" class="p-section">
		<div class="shell">
			<div class="section-title-row reveal">
				<div class="left">
					<span class="eyebrow">01 · Selected work</span>
					<h2 class="section-title">Things I've shipped, and the work behind them.</h2>
				</div>
				<p class="lead">
					A small set of projects from the last few years. Each one moved a real metric: faster
					pipelines, lower latency, fewer incidents.
				</p>
			</div>

			<div class="filter-row reveal">
				<div class="chips">
					{#each PROJECT_TAGS as t}
						<button
							class={`chip-btn ${filter === t ? 'active' : ''}`}
							onclick={() => (filter = t)}
						>
							{t}
							<span class="count">{t === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(t)).length}</span>
						</button>
					{/each}
				</div>
				<div class="view-toggle" role="tablist" aria-label="Project view">
					<button class={view === 'cards' ? 'active' : ''} onclick={() => (view = 'cards')} aria-label="Card view">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
						Cards
					</button>
					<button class={view === 'list' ? 'active' : ''} onclick={() => (view = 'list')} aria-label="List view">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></svg>
						List
					</button>
				</div>
			</div>

			{#if view === 'cards'}
				<div class="projects-grid">
					{#each filteredProjects as p, i}
						<div class="reveal" style={`transition-delay:${i * 60}ms`}>
							<article class="project-card">
								<div class="meta-row">
									<span>{p.year} · {p.tags.join(' / ')}</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
								</div>
								<h3>{p.title}</h3>
								<p class="role">{p.role}</p>
								<!-- Thumbnail -->
								{#if p.thumbVariant === 'tradewind'}
									<div class="thumb tradewind">
										<div class="layer"></div>
										<div class="bars">
											<span style="height:30%"></span><span style="height:55%"></span><span style="height:80%"></span>
											<span style="height:45%"></span><span style="height:62%"></span><span style="height:70%"></span>
											<span style="height:40%"></span><span style="height:85%"></span>
										</div>
										<span class="thumb-tag">{p.thumbCaption}</span>
									</div>
								{:else if p.thumbVariant === 'voyager'}
									<div class="thumb voyager">
										<div class="chart"></div>
										<svg viewBox="0 0 400 220" preserveAspectRatio="none">
											<defs>
												<linearGradient id="vg{p.id}" x1="0" y1="0" x2="0" y2="1">
													<stop offset="0%" stop-color="var(--accent)" stop-opacity="0.5" />
													<stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
												</linearGradient>
											</defs>
											<path d="M 0 170 L 40 160 L 80 140 L 120 145 L 160 110 L 200 95 L 240 80 L 280 50 L 320 60 L 360 35 L 400 25 L 400 220 L 0 220 Z" fill="url(#vg{p.id})" />
											<path d="M 0 170 L 40 160 L 80 140 L 120 145 L 160 110 L 200 95 L 240 80 L 280 50 L 320 60 L 360 35 L 400 25" stroke="var(--accent)" stroke-width="2.5" fill="none" />
											<circle cx="360" cy="35" r="5" fill="var(--accent)" />
											<circle cx="360" cy="35" r="9" fill="var(--accent)" fill-opacity="0.25" />
										</svg>
										<div class="badge">live · {p.stats[2].v} {p.stats[2].l}</div>
										<span class="thumb-tag">{p.thumbCaption}</span>
									</div>
								{:else}
									<div class="thumb larch">
										<div class="doc">
											<div class="lock">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
											</div>
											<div class="ln title"></div>
											<div class="ln"></div><div class="ln"></div>
											<div class="ln short"></div>
											<div class="ln"></div><div class="ln short"></div>
											<div class="ln"></div>
										</div>
										<span class="thumb-tag">{p.thumbCaption}</span>
									</div>
								{/if}
								<p class="blurb">{p.blurb}</p>
								<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px;">
									{#each p.stack as s}<span class="tg-pill">{s}</span>{/each}
								</div>
								<div class="stats">
									{#each p.stats as st}
										<div class="stat">
											<div class="v">{st.v}</div>
											<div class="l">{st.l}</div>
										</div>
									{/each}
								</div>
							</article>
						</div>
					{/each}
				</div>
			{:else}
				<div class="projects-list">
					{#each filteredProjects as p}
						<div class="reveal">
							<a class="proj-row" href={`#${p.id}`} onclick={(e) => e.preventDefault()}>
								<span class="yr">{p.year}</span>
								<span class="ttl">{p.title}<small>{p.role}</small></span>
								<span class="desc">{p.blurb}</span>
								<span class="tg">{#each p.stack.slice(0, 3) as s}<span class="tg-pill">{s}</span>{/each}</span>
								<span class="arr">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
								</span>
							</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- ── About ── -->
	<section id="about" class="p-section bg-alt">
		<div class="shell">
			<div class="section-title-row reveal">
				<div class="left">
					<span class="eyebrow">02 · About</span>
					<h2 class="section-title">The person behind the commits.</h2>
				</div>
				<p class="lead">
					Eight years in, multiple product domains, and one consistent throughline: ownership from
					design through production.
				</p>
			</div>
			<div class="about-grid">
				<div class="reveal">
					<div class="portrait" aria-label="Portrait placeholder">
						<span class="slab2"></span>
						<span class="slab1"></span>
						<span class="frame"></span>
						<span class="initials">{PERSON.initials}</span>
						<span class="tag">Emmanuel Kpendo</span>
					</div>
				</div>
				<div class="about-body reveal">
					<p>
						I grew up curious about how things connect. Early on I realized software was the fastest way
						to build systems that matter, so I went deep: <strong>full-stack from day one</strong>, cloud
						infrastructure from early on, and product thinking baked in throughout.
					</p>
					<p>
						Today I work as a senior engineer at <strong>AmaliTech</strong>, building multi-tenant
						platforms and AI-powered dashboards for fintech and logistics clients. I lead both frontend
						delivery and backend architecture, and I care deeply about the seam where elegant UI meets
						resilient services.
					</p>
					<p>
						Outside work I read widely, tinker with side projects, and believe that the best engineering
						decisions come from genuinely understanding the problem first.
					</p>
					<div class="about-facts">
						{#each FACTS as f}
							<div class="fact">
								<div class="k">{f.k}</div>
								<div class="v">{f.v}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Experience ── -->
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
				{#each EXPERIENCE as e, i}
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
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
					Download resume (PDF)
				</a>
			</div>
		</div>
	</section>

	<!-- ── Stack ── -->
	<section id="stack" class="p-section bg-canvas">
		<div class="shell">
			<div class="section-title-row reveal">
				<div class="left">
					<span class="eyebrow">04 · Stack</span>
					<h2 class="section-title">What I reach for.</h2>
				</div>
				<p class="lead">
					Tools earn their place by being boring, fast, and well-documented.
				</p>
			</div>
			<div class="stack-grid" bind:this={stackGridRef}>
				{#each STACK as g, i}
					<div class="stack-group">
						<div class="gh">
							<span class="gname">{g.name}</span>
							<span class="gnum">{String(i + 1).padStart(2, '0')} / {STACK.length}</span>
						</div>
						<div class="gnote">{g.note}</div>
						<div class="stack-pills">
							{#each g.items as it}<span class="stack-pill">{it}</span>{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── Contact ── -->
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
				<!-- Left side -->
				<div class="contact-side">
					<button class="email-card" onclick={copyEmail}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg>
						<span style="flex:1;text-align:left;">{PERSON.email}</span>
						<span class="copy">
							{#if copied}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
								Copied
							{:else}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
								Copy
							{/if}
						</span>
					</button>
					<div class="or-divider">or find me on</div>
					<div class="quick-links">
						<a href={PERSON.links.linkedin} target="_blank" rel="noreferrer">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
							<span class="lbl">LinkedIn</span>
							<span class="sub">/in/emmanuelkpendo</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
						</a>
						<a href={PERSON.links.github} target="_blank" rel="noreferrer">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
							<span class="lbl">GitHub</span>
							<span class="sub">@emmanuelkpendo</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
						</a>
						<a href={`mailto:${PERSON.email}`}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg>
							<span class="lbl">Email</span>
							<span class="sub">{PERSON.email}</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
						</a>
					</div>
				</div>

				<!-- Right side: Contact form -->
				{#if formStatus === 'sent'}
					<div
						class="contact-form"
						style="min-height:380px;justify-content:center;align-items:center;display:flex;flex-direction:column;text-align:center;gap:16px;"
					>
						<div
							style="width:64px;height:64px;border-radius:50%;background:color-mix(in srgb,var(--color-success-500) 18%,transparent);display:inline-flex;align-items:center;justify-content:center;color:var(--color-success-500);"
						>
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
						</div>
						<h3
							style="font-family:var(--font-display);color:var(--canvas-fg);margin:0;font-size:24px;font-weight:600;"
						>
							Got it, thanks.
						</h3>
						<p style="color:var(--canvas-fg-muted);margin:0;font-size:14px;max-width:36ch;">
							I'll reply within two working days. If it's urgent, drop me a line at
							<a href={`mailto:${PERSON.email}`} style="color:var(--accent);">{PERSON.email}</a>.
						</p>
						<button
							class="form-submit"
							onclick={() => (formStatus = 'idle')}
							style="margin-top:10px;"
						>
							Send another
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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
								<label for="cf-co">Company <span style="color:var(--canvas-fg-muted);font-weight:400;text-transform:none;letter-spacing:0;">(optional)</span></label>
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
									{#each BUDGETS as b, bi}
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
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
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
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
								{/if}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- ── Footer ── -->
	<footer class="p-footer">
		<div class="shell footer-inner">
			<span>© 2026 {PERSON.name}, built with care in Accra</span>
			<div class="socials">
				<a href={PERSON.links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
				</a>
				<a href={PERSON.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
				</a>
				<a href={PERSON.links.twitter} aria-label="Twitter / X" target="_blank" rel="noreferrer">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4 14 10l5 10h-3l-3-6-4.5 6H6l5-6-5-10h4l3 6 5-6z" /></svg>
				</a>
			</div>
			<span style="font-family:var(--font-mono);">v2026.05 · all systems nominal</span>
		</div>
	</footer>

	<!-- ── Command palette ── -->
	<div
		class={`cmd-overlay ${cmdOpen ? 'open' : ''}`}
		onclick={() => (cmdOpen = false)}
		onkeydown={(e) => { if (e.key === 'Escape') cmdOpen = false; }}
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-label="Command palette"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="cmd-panel" onclick={(e) => e.stopPropagation()}>
			<div class="cmd-input">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ink-muted);flex-shrink:0;"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
				<input
					bind:this={cmdInputRef}
					placeholder="Where to?"
					bind:value={cmdQuery}
					onkeydown={handleCmdKey}
					oninput={() => (cmdActive = 0)}
				/>
				<kbd
					style="font-family:var(--font-mono);font-size:11px;padding:3px 8px;border:1px solid var(--line);border-radius:4px;color:var(--ink-muted);"
				>esc</kbd>
			</div>
			<div class="cmd-items">
				{#if filteredCmdItems.length === 0}
					<div style="padding:20px 14px;color:var(--ink-muted);font-size:13px;">
						No matches. Try "work", "stack", or "github".
					</div>
				{/if}
				{#each filteredCmdItems as item, i}
					<div
						class={`cmd-item ${i === cmdActive ? 'active' : ''}`}
						role="option"
						tabindex="0"
						aria-selected={i === cmdActive}
						onmouseenter={() => (cmdActive = i)}
						onclick={() => selectCmd(item)}
					>
						<span class="ico">
							{#if item.ico === 'code'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></svg>{/if}
							{#if item.ico === 'sparkles'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6 4 4M20 20l-1.6-1.6M5.6 18.4 4 20M20 4l-1.6 1.6" /><circle cx="12" cy="12" r="3" /></svg>{/if}
							{#if item.ico === 'briefcase'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>{/if}
							{#if item.ico === 'package'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></svg>{/if}
							{#if item.ico === 'mail'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg>{/if}
							{#if item.ico === 'github'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>{/if}
							{#if item.ico === 'linkedin'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>{/if}
						</span>
						{item.label}
						<span class="meta">{item.meta}</span>
					</div>
				{/each}
			</div>
			<div class="cmd-foot">
				<span>↑↓ navigate, ↵ select, esc close</span>
				<span>{filteredCmdItems.length} of {CMD_ITEMS.length}</span>
			</div>
		</div>
	</div>
</div>
