<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/stores/projects';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	const heroHighlights = [
		'Frontend systems at scale',
		'Cloud-native architecture',
		'Product velocity and DX'
	];

	const metrics = [
		{ label: 'Years delivering products', value: '8+' },
		{ label: 'Production systems launched', value: '40+' },
		{ label: 'Avg. latency improvement', value: '55%' }
	];

	const capabilities = [
		{
			title: 'Engineering leadership',
			description:
				'Partnering with founders and product teams to craft durable architectures, battle-tested delivery plans, and high-performing squads.'
		},
		{
			title: 'Full-stack velocity',
			description:
				'From design systems to Go services and SQLC pipelines, I ship end-to-end solutions that scale with your business.'
		},
		{
			title: 'Cloud excellence',
			description:
				'AWS-first delivery with observability, cost governance, and high-availability baked in from day one.'
		}
	];

	const stackPillars = [
		{
			label: 'Frontend',
			items: ['React', 'Angular', 'Vue', 'Next.js', 'SvelteKit']
		},
		{
			label: 'Backend',
			items: ['Golang', 'Node.js', 'REST + GraphQL', 'SQLC']
		},
		{
			label: 'Data',
			items: ['Postgres', 'Redis', 'Event Streaming', 'Analytics Warehousing']
		},
		{
			label: 'Cloud',
			items: ['AWS ECS', 'Lambda', 'S3', 'RDS', 'CloudFront', 'Terraform']
		}
	];

	const timeline = [
		{
			year: '2025',
			role: 'Senior Software Engineer',
			focus: 'Platform architecture, multi-tenant product scaling, and AI-powered dashboards.'
		},
		{
			year: '2023',
			role: 'Lead Frontend Engineer',
			focus: 'Design systems modernization and SvelteKit adoption across enterprise teams.'
		},
		{
			year: '2021',
			role: 'Full-stack Engineer',
			focus: 'Cloud migration to AWS, SQLC data layers, and real-time UX.'
		}
	];

	const testimonials = [
		{
			name: 'Amina Bell',
			role: 'VP Product, Fintech',
			quote:
				'Emmanuel blends product instinct with rigorous engineering. He made our roadmap feel attainable overnight.'
		},
		{
			name: 'Carlos Ng',
			role: 'Head of Engineering, SaaS',
			quote:
				'The GSAP-driven UI polish and systems thinking he brought lifted our entire customer experience.'
		}
	];

	let root: HTMLElement;

	onMount(() => {
		void projects.load();

		let cleanup = () => {};

		const initAnimations = async () => {
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (reduceMotion) return;

			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');

			gsap.registerPlugin(ScrollTrigger);

			const context = gsap.context(() => {
				const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
				heroTimeline
					.from('[data-hero="title"]', { y: 40, opacity: 0, duration: 1 })
					.from('[data-hero="subtitle"]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
					.from('[data-hero="cta"]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
					.from('[data-hero="chips"]', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4');

				const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]');
				revealItems.forEach((item: HTMLElement) => {
					gsap.from(item, {
						y: 40,
						opacity: 0,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: item,
							start: 'top 85%'
						}
					});
				});

				const staggerGroups = gsap.utils.toArray<HTMLElement>('[data-stagger]');
				staggerGroups.forEach((group: HTMLElement) => {
					const items = group.querySelectorAll('[data-stagger-item]');
					gsap.from(items, {
						y: 30,
						opacity: 0,
						duration: 0.8,
						ease: 'power3.out',
						stagger: 0.12,
						scrollTrigger: {
							trigger: group,
							start: 'top 80%'
						}
					});
				});

				gsap.utils.toArray<HTMLElement>('[data-float]').forEach((item: HTMLElement, index: number) => {
					gsap.to(item, {
						y: index % 2 === 0 ? -30 : 30,
						repeat: -1,
						yoyo: true,
						duration: 6 + index,
						ease: 'sine.inOut'
					});
				});

				gsap.to('[data-marquee]', {
					xPercent: -50,
					repeat: -1,
					duration: 20,
					ease: 'none'
				});

				ScrollTrigger.refresh();
			}, root);

			cleanup = () => context.revert();
		};

		void initAnimations();
		return () => cleanup();
	});
</script>

<svelte:head>
	<title>Emmanuel Kpendo | Senior Software Engineer</title>
	<meta
		name="description"
		content="Senior Software Engineer specializing in React, Angular, Vue, Next.js, SvelteKit, Golang, Postgres, SQLC, and AWS."
	/>
</svelte:head>

<div bind:this={root} class="relative overflow-hidden">
	<div class="absolute -top-24 right-10 h-72 w-72 rounded-full bg-cyan-300/35 blur-[120px]" data-float></div>
	<div class="absolute top-[30%] -left-16 h-80 w-80 rounded-full bg-emerald-300/25 blur-[140px]" data-float></div>
	<div class="absolute bottom-[15%] right-[20%] h-64 w-64 rounded-full bg-amber-300/25 blur-[120px]" data-float></div>

	<header class="g-px pt-10">
		<nav class="flex flex-wrap items-center justify-between gap-4" data-reveal>
			<div class="flex items-center gap-3">
				<span class="h-10 w-10 rounded-2xl bg-white/10 p-2 text-lg font-semibold">EK</span>
				<div>
					<p class="text-sm text-white/70">Emmanuel Kpendo</p>
					<p class="text-xs text-white/40">Senior Software Engineer</p>
				</div>
			</div>
			<div class="flex items-center gap-6 text-sm uppercase tracking-[0.3em] text-white/80">
				<a href="#work">Work</a>
				<a href="#expertise">Expertise</a>
				<a href="#insights">Insights</a>
				<a href="/admin" class="text-white">Admin</a>
			</div>
		</nav>
	</header>

	<section class="g-px section-space pb-28">
		<div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
			<div class="space-y-8">
				<Badge class="chip" data-hero="chips">Senior Product + Cloud Engineering</Badge>
				<h1 class="neon-text text-4xl font-semibold leading-tight md:text-6xl" data-hero="title">
					Building premium product experiences across web, cloud, and data platforms.
				</h1>
				<p class="max-w-xl text-lg text-white/85" data-hero="subtitle">
					I design and deliver high-performance applications with refined UI, resilient Go services,
					SQLC-powered data layers, and AWS-native infrastructure that scales with your roadmap.
				</p>
				<div class="flex flex-wrap gap-4" data-hero="cta">
					<Button
						class="border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30 hover:brightness-105"
					>
						Book a strategy call
					</Button>
					<Button variant="outline" class="border-cyan-100/40 bg-white/10">Download resume</Button>
				</div>
				<div class="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
					{#each heroHighlights as highlight}
						<span class="rounded-full border border-white/10 px-4 py-2">{highlight}</span>
					{/each}
				</div>
			</div>
			<Card class="holo-card glow ring-1 ring-cyan-200/30 p-8" data-reveal>
				<div class="space-y-6">
					<div class="flex items-center justify-between">
						<p class="text-sm uppercase tracking-[0.4em] text-cyan-100/80">Signature focus</p>
						<span class="text-xs text-white/40">2026 Ready</span>
					</div>
					<p class="text-2xl font-semibold">
						Designing elegant, fast, and resilient systems for modern SaaS and enterprise teams.
					</p>
					<div class="grid gap-6 md:grid-cols-3" data-stagger>
						{#each metrics as metric}
							<div class="space-y-2" data-stagger-item>
								<p class="text-3xl font-semibold text-white">{metric.value}</p>
								<p class="text-xs uppercase tracking-[0.2em] text-white/50">{metric.label}</p>
							</div>
						{/each}
					</div>
				</div>
			</Card>
		</div>
	</section>

	<section class="g-px section-space" id="expertise">
		<div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
			<div class="space-y-6" data-reveal>
				<Badge class="chip">Capabilities</Badge>
				<h2 class="text-3xl md:text-4xl">Strategic engineering with elegant delivery.</h2>
				<p class="text-lg text-white/85">
					I build cohesive systems where thoughtful UX meets strong cloud foundations, enabling teams to ship
					quickly with confidence.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3" data-stagger>
				{#each capabilities as item}
					<Card class="holo-card p-6" data-stagger-item>
						<h3 class="text-lg font-semibold">{item.title}</h3>
						<p class="mt-3 text-sm text-white/80">{item.description}</p>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<section class="g-px section-space" id="work">
		<div class="flex flex-wrap items-end justify-between gap-6" data-reveal>
			<div>
				<Badge class="chip">Selected work</Badge>
				<h2 class="text-3xl md:text-4xl">Flagship projects and product systems.</h2>
			</div>
			<a class="text-sm uppercase tracking-[0.3em] text-cyan-100/80" href="/admin">
				Manage projects
			</a>
		</div>
		<div class="mt-10 grid gap-6 lg:grid-cols-3" data-stagger>
			{#each $projects as project}
				<Card class="holo-card p-6 flex flex-col gap-6" data-stagger-item>
					<div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
						<span>{project.year}</span>
						<span>{project.status}</span>
					</div>
					<h3 class="text-xl font-semibold">{project.title}</h3>
					<p class="text-sm text-white/85">{project.summary}</p>
					<p class="text-xs uppercase tracking-[0.2em] text-white/40">{project.role}</p>
					<p class="text-sm text-white/80">{project.impact}</p>
					<div class="flex flex-wrap gap-2">
						{#each project.stack as tech}
							<Badge variant="outline" class="px-3 py-1 text-[11px] normal-case tracking-normal">{tech}</Badge>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</section>

	<section class="section-space" id="insights">
		<div class="g-px">
			<Card class="holo-card p-10" data-reveal>
				<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
					<div class="space-y-6">
						<Badge class="chip">Experience map</Badge>
						<h2 class="text-3xl md:text-4xl">Engineering leadership across every layer.</h2>
						<p class="text-lg text-white/85">
							I blend product strategy, deep technical execution, and cloud stewardship to build systems
							that are fast, reliable, and delightful to operate.
						</p>
						<div class="grid gap-4" data-stagger>
							{#each timeline as item}
								<div class="flex items-start gap-4" data-stagger-item>
									<span class="text-sm text-cyan-100/80">{item.year}</span>
									<div>
										<p class="text-lg font-semibold">{item.role}</p>
										<p class="text-sm text-white/80">{item.focus}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="space-y-6">
						<Badge class="chip">Tech pillars</Badge>
						<div class="grid gap-4" data-stagger>
							{#each stackPillars as pillar}
								<div class="rounded-3xl border border-cyan-100/25 bg-white/10 p-5" data-stagger-item>
									<p class="text-sm uppercase tracking-[0.3em] text-cyan-100/80">{pillar.label}</p>
									<p class="mt-3 text-sm text-white/80">{pillar.items.join(' | ')}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<section class="section-space">
		<div class="g-px">
			<div class="flex flex-col gap-8" data-reveal>
				<Badge class="chip">Endorsements</Badge>
				<div class="grid gap-6 lg:grid-cols-2" data-stagger>
					{#each testimonials as item}
						<Card class="holo-card p-6" data-stagger-item>
							<p class="text-lg leading-relaxed">"{item.quote}"</p>
							<p class="mt-4 text-sm text-cyan-100/80">{item.name} | {item.role}</p>
						</Card>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section-space">
		<div class="g-px">
			<Card class="holo-card p-10" data-reveal>
				<div class="flex flex-wrap items-center justify-between gap-6">
					<div class="space-y-4">
						<Badge class="chip">Let's build</Badge>
						<h2 class="text-3xl md:text-4xl">Ready to elevate your product?</h2>
						<p class="text-white/85">
							Available for senior engineering leadership, consulting, and strategic product builds.
						</p>
					</div>
					<div class="flex flex-wrap gap-4">
						<Button
							class="border-none bg-[linear-gradient(90deg,#ffd392,#8effd2)] text-slate-900 shadow-lg shadow-amber-300/35 hover:brightness-105"
						>
							Send a proposal
						</Button>
						<Button variant="outline" class="border-cyan-100/40 bg-white/10">hello@emmanuelkpendo.dev</Button>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<section class="overflow-hidden border-t border-white/5 py-10">
		<div class="g-px">
			<div class="flex items-center gap-8 text-xs uppercase tracking-[0.4em] text-cyan-100/70">
				<div class="flex gap-8" data-marquee>
					<span>React</span>
					<span>Angular</span>
					<span>Vue</span>
					<span>Next.js</span>
					<span>SvelteKit</span>
					<span>Golang</span>
					<span>Postgres</span>
					<span>SQLC</span>
					<span>AWS</span>
					<span>React</span>
					<span>Angular</span>
					<span>Vue</span>
					<span>Next.js</span>
					<span>SvelteKit</span>
					<span>Golang</span>
					<span>Postgres</span>
					<span>SQLC</span>
					<span>AWS</span>
				</div>
			</div>
		</div>
	</section>

	<footer class="g-px py-12 text-sm text-white/50">
		<div class="flex flex-wrap items-center justify-between gap-6">
			<p>(c) 2026 Emmanuel Kpendo. All rights reserved.</p>
			<div class="flex items-center gap-4">
				<a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
				<a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
				<a href="mailto:hello@emmanuelkpendo.dev">Email</a>
			</div>
		</div>
	</footer>
</div>
