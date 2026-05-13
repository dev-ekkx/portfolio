<script lang="ts">
	import { onMount } from 'svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import WorkSection from '$lib/components/sections/WorkSection.svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import ExperienceSection from '$lib/components/sections/ExperienceSection.svelte';
	import StackSection from '$lib/components/sections/StackSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';

	import { PERSON, FACTS } from '$lib/data/person';
	import { PROJECTS, PROJECT_TAGS } from '$lib/data/projects';
	import { EXPERIENCE } from '$lib/data/experience';
	import { STACK } from '$lib/data/stack';
	import { NAV_SECTIONS, CMD_ITEMS, BUDGETS } from '$lib/data/navigation';
	import type { CmdItem } from '$lib/types';

	let activeId = $state('work');
	let onCanvas = $state(true);
	let cmdOpen = $state(false);
	let lenis: unknown = null;

	const extraCleanups: (() => void)[] = [];

	function registerCleanup(fn: () => void) {
		extraCleanups.push(fn);
	}

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

	function openCmdPalette() {
		cmdOpen = true;
	}

	function handleCmdSelect(item: CmdItem) {
		if ('anchor' in item && item.anchor) scrollToAnchor(item.anchor as string);
		else if ('href' in item && item.href) window.open(item.href as string, '_blank');
		cmdOpen = false;
	}

	onMount(() => {
		const cleanups: (() => void)[] = [];

		const onScroll = () => {
			onCanvas = window.scrollY < 80;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		cleanups.push(() => window.removeEventListener('scroll', onScroll));

		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				openCmdPalette();
			}
		};
		window.addEventListener('keydown', onKey);
		cleanups.push(() => window.removeEventListener('keydown', onKey));

		(async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

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

			// Global scroll-reveal
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

		return () => {
			cleanups.forEach((f) => f());
			extraCleanups.forEach((f) => f());
		};
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
	<NavBar
		{activeId}
		{onCanvas}
		person={PERSON}
		navSections={NAV_SECTIONS}
		onScrollToAnchor={scrollToAnchor}
		onOpenCmdPalette={openCmdPalette}
	/>

	<HeroSection
		person={PERSON}
		onScrollToWork={() => scrollToAnchor('work')}
		onScrollToContact={() => scrollToAnchor('contact')}
		onCleanup={registerCleanup}
	/>

	<WorkSection projects={PROJECTS} projectTags={PROJECT_TAGS} />

	<AboutSection person={PERSON} facts={FACTS} />

	<ExperienceSection experience={EXPERIENCE} />

	<StackSection stack={STACK} />

	<ContactSection person={PERSON} budgets={BUDGETS} />

	<Footer person={PERSON} />

	<CommandPalette
		open={cmdOpen}
		cmdItems={CMD_ITEMS}
		onClose={() => (cmdOpen = false)}
		onSelect={handleCmdSelect}
	/>
</div>
