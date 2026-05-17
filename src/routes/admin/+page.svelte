<script lang="ts">
	import type { PageData } from './$types';
	import type { Project, WorkProject, ExperienceItem, StackGroup, Person } from '$lib/interfaces';
	import type { ProjectStat, Fact } from '$lib/types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { signIn, signOut } from '$lib/auth-client';

	let { data }: { data: PageData } = $props();

	type Tab = 'projects' | 'work' | 'experience' | 'stack' | 'person';
	let activeTab = $state<Tab>('projects');

	// ─── Status feedback ──────────────────────────────────────────────────────
	let saving = $state(false);
	let feedback = $state('');

	const notify = (msg: string) => {
		feedback = msg;
		setTimeout(() => (feedback = ''), 3000);
	};

	const api = async (method: string, url: string, body?: unknown) => {
		saving = true;
		try {
			const res = await fetch(url, {
				method,
				headers: body ? { 'Content-Type': 'application/json' } : {},
				body: body ? JSON.stringify(body) : undefined
			});
			return res;
		} finally {
			saving = false;
		}
	};

	// ─── Projects ─────────────────────────────────────────────────────────────
	const statusOptions: Project['status'][] = ['Shipped', 'Scaling', 'In Discovery', 'Archived'];

	let projects = $state<(Project & { id: string })[]>(data.projects as (Project & { id: string })[]);
	let editingProjectId = $state<string | null>(null);
	let projectForm = $state<Project>({
		id: '',
		title: '',
		summary: '',
		role: '',
		impact: '',
		year: new Date().getFullYear().toString(),
		status: 'In Discovery',
		stack: []
	});

	const resetProjectForm = () => {
		editingProjectId = null;
		projectForm = {
			id: '',
			title: '',
			summary: '',
			role: '',
			impact: '',
			year: new Date().getFullYear().toString(),
			status: 'In Discovery',
			stack: []
		};
	};

	const saveProject = async () => {
		if (!projectForm.title.trim()) return;
		const payload: Omit<Project, 'id'> = {
			...projectForm,
			stack: projectForm.stack.map((s) => s.trim()).filter(Boolean)
		};
		if (editingProjectId) {
			const res = await api('PUT', `/api/projects/${editingProjectId}`, payload);
			if (res.ok) {
				const updated = (await res.json()) as Project & { id: string };
				projects = projects.map((p) => (p.id === editingProjectId ? updated : p));
				notify('Project updated.');
			}
		} else {
			const res = await api('POST', '/api/projects', payload);
			if (res.ok) {
				const created = (await res.json()) as Project & { id: string };
				projects = [created, ...projects];
				notify('Project added.');
			}
		}
		resetProjectForm();
	};

	const editProject = (p: Project & { id: string }) => {
		editingProjectId = p.id;
		projectForm = { ...p };
	};

	const deleteProject = async (id: string) => {
		const res = await api('DELETE', `/api/projects/${id}`);
		if (res.ok) {
			projects = projects.filter((p) => p.id !== id);
			if (editingProjectId === id) resetProjectForm();
			notify('Project deleted.');
		}
	};

	// ─── Work projects ────────────────────────────────────────────────────────
	type WorkProjectWithId = WorkProject & { id: string };

	let workProjects = $state<WorkProjectWithId[]>(data.workProjects as WorkProjectWithId[]);
	let editingWorkSlug = $state<string | null>(null);

	const emptyWork = (): Omit<WorkProject, 'id'> & { slug: string } => ({
		slug: '',
		year: new Date().getFullYear().toString(),
		title: '',
		role: '',
		blurb: '',
		tags: [],
		stack: [],
		stats: [],
		thumbVariant: '',
		thumbCaption: ''
	});

	let workForm = $state(emptyWork());

	const resetWorkForm = () => {
		editingWorkSlug = null;
		workForm = emptyWork();
	};

	const saveWork = async () => {
		if (!workForm.title.trim() || !workForm.slug.trim()) return;
		const payload = {
			...workForm,
			tags: workForm.tags.map((t) => t.trim()).filter(Boolean),
			stack: workForm.stack.map((s) => s.trim()).filter(Boolean)
		};
		if (editingWorkSlug) {
			const res = await api('PUT', `/api/work-projects/${editingWorkSlug}`, payload);
			if (res.ok) {
				const updated = (await res.json()) as WorkProjectWithId;
				workProjects = workProjects.map((w) => (w.id === editingWorkSlug ? updated : w));
				notify('Work project updated.');
			}
		} else {
			const res = await api('POST', '/api/work-projects', payload);
			if (res.ok) {
				const created = (await res.json()) as WorkProjectWithId;
				workProjects = [...workProjects, created];
				notify('Work project added.');
			}
		}
		resetWorkForm();
	};

	const editWork = (w: WorkProjectWithId) => {
		editingWorkSlug = w.id;
		workForm = {
			slug: w.id,
			year: w.year,
			title: w.title,
			role: w.role,
			blurb: w.blurb,
			tags: [...w.tags],
			stack: [...w.stack],
			stats: [...w.stats],
			thumbVariant: w.thumbVariant,
			thumbCaption: w.thumbCaption
		};
	};

	const deleteWork = async (slug: string) => {
		const res = await api('DELETE', `/api/work-projects/${slug}`);
		if (res.ok) {
			workProjects = workProjects.filter((w) => w.id !== slug);
			if (editingWorkSlug === slug) resetWorkForm();
			notify('Work project deleted.');
		}
	};

	// ─── Experience ──────────────────────────────────────────────────────────
	type ExpWithId = ExperienceItem & { id: string };

	let experience = $state<ExpWithId[]>(data.experience as ExpWithId[]);
	let editingExpId = $state<string | null>(null);

	const emptyExp = (): ExperienceItem => ({
		when: '',
		role: '',
		co: '',
		body: '',
		place: '',
		current: false
	});

	let expForm = $state(emptyExp());

	const resetExpForm = () => {
		editingExpId = null;
		expForm = emptyExp();
	};

	const saveExp = async () => {
		if (!expForm.role.trim() || !expForm.co.trim()) return;
		if (editingExpId) {
			const res = await api('PUT', `/api/experience/${editingExpId}`, expForm);
			if (res.ok) {
				const updated = (await res.json()) as ExpWithId;
				experience = experience.map((e) => (e.id === editingExpId ? updated : e));
				notify('Experience updated.');
			}
		} else {
			const res = await api('POST', '/api/experience', expForm);
			if (res.ok) {
				const created = (await res.json()) as ExpWithId;
				experience = [...experience, created];
				notify('Experience added.');
			}
		}
		resetExpForm();
	};

	const editExp = (e: ExpWithId) => {
		editingExpId = e.id;
		expForm = { when: e.when, role: e.role, co: e.co, body: e.body, place: e.place, current: e.current };
	};

	const deleteExp = async (id: string) => {
		const res = await api('DELETE', `/api/experience/${id}`);
		if (res.ok) {
			experience = experience.filter((e) => e.id !== id);
			if (editingExpId === id) resetExpForm();
			notify('Experience deleted.');
		}
	};

	// ─── Stack ────────────────────────────────────────────────────────────────
	type StackWithId = StackGroup & { id: string };

	let stack = $state<StackWithId[]>(data.stack as StackWithId[]);
	let editingStackId = $state<string | null>(null);

	const emptyStack = (): StackGroup => ({ name: '', note: '', items: [] });
	let stackForm = $state(emptyStack());

	const resetStackForm = () => {
		editingStackId = null;
		stackForm = emptyStack();
	};

	const saveStack = async () => {
		if (!stackForm.name.trim()) return;
		const payload = { ...stackForm, items: stackForm.items.map((i) => i.trim()).filter(Boolean) };
		if (editingStackId) {
			const res = await api('PUT', `/api/stack/${editingStackId}`, payload);
			if (res.ok) {
				const updated = (await res.json()) as StackWithId;
				stack = stack.map((s) => (s.id === editingStackId ? updated : s));
				notify('Stack group updated.');
			}
		} else {
			const res = await api('POST', '/api/stack', payload);
			if (res.ok) {
				const created = (await res.json()) as StackWithId;
				stack = [...stack, created];
				notify('Stack group added.');
			}
		}
		resetStackForm();
	};

	const editStack = (s: StackWithId) => {
		editingStackId = s.id;
		stackForm = { name: s.name, note: s.note, items: [...s.items] };
	};

	const deleteStack = async (id: string) => {
		const res = await api('DELETE', `/api/stack/${id}`);
		if (res.ok) {
			stack = stack.filter((s) => s.id !== id);
			if (editingStackId === id) resetStackForm();
			notify('Stack group deleted.');
		}
	};

	// ─── Person ───────────────────────────────────────────────────────────────
	let personForm = $state<Person & { facts: Fact[] }>({
		name: data.person?.name ?? '',
		initials: data.person?.initials ?? '',
		role: data.person?.role ?? '',
		location: data.person?.location ?? '',
		email: data.person?.email ?? '',
		links: {
			github: data.person?.links.github ?? '',
			linkedin: data.person?.links.linkedin ?? '',
			twitter: data.person?.links.twitter ?? ''
		},
		available: data.person?.available ?? '',
		facts: data.facts ?? []
	});

	const savePerson = async () => {
		const res = await api('PUT', '/api/person', personForm);
		if (res.ok) {
			const updated = (await res.json()) as { person: Person; facts: Fact[] };
			personForm = { ...updated.person, facts: updated.facts };
			notify('Profile saved.');
		}
	};

	const addFact = () => {
		personForm = { ...personForm, facts: [...personForm.facts, { k: '', v: '' }] };
	};

	const removeFact = (i: number) => {
		personForm = { ...personForm, facts: personForm.facts.filter((_, idx) => idx !== i) };
	};

	// ─── Stats helpers for work form ──────────────────────────────────────────
	const addStat = () => {
		workForm = { ...workForm, stats: [...workForm.stats, { v: '', l: '' }] };
	};

	const removeStat = (i: number) => {
		workForm = { ...workForm, stats: (workForm.stats as ProjectStat[]).filter((_, idx) => idx !== i) };
	};

	const tabs: { id: Tab; label: string; count?: number }[] = [
		{ id: 'projects', label: 'Projects', count: projects.length },
		{ id: 'work', label: 'Work Projects', count: workProjects.length },
		{ id: 'experience', label: 'Experience', count: experience.length },
		{ id: 'stack', label: 'Stack', count: stack.length },
		{ id: 'person', label: 'Profile' }
	];
</script>

<svelte:head>
	<title>Admin | Emmanuel Kpendo</title>
</svelte:head>

{#if !data.user}
	<div class="flex min-h-screen items-center justify-center p-6">
		<div class="holo-card w-full max-w-sm space-y-6 rounded-2xl p-10 text-center">
			<div>
				<p class="text-xs uppercase tracking-[0.25em] text-white/40">Portfolio</p>
				<h1 class="mt-2 text-2xl font-semibold text-white">Admin access</h1>
				<p class="mt-2 text-sm text-white/50">Sign in with your Google account to continue.</p>
			</div>
			<button
				onclick={() => signIn.social({ provider: 'google', callbackURL: '/admin' })}
				class="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-white/90"
			>
				<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
					<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
					<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
					<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
					<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
				</svg>
				Sign in with Google
			</button>
		</div>
	</div>
{:else}

<div class="min-h-screen">
	<header class="g-px pt-10 pb-6 border-b border-white/10">
		<div class="flex flex-wrap items-center justify-between gap-6">
			<div>
				<Badge class="chip">Admin suite</Badge>
				<h1 class="mt-4 text-3xl md:text-4xl">Control center</h1>
				<p class="mt-2 text-white/60 text-sm">
					{#if data.dbConnected}
						<span class="text-emerald-400">● Connected to MongoDB</span>
					{:else}
						<span class="text-red-400">● No database connection — changes won't persist</span>
					{/if}
				</p>
			</div>
			<div class="flex items-center gap-4">
				<a class="text-sm uppercase tracking-[0.3em] text-cyan-100/80" href="/">Back to site</a>
				<button
					onclick={() => signOut({ fetchOptions: { onSuccess: () => window.location.reload() } })}
					class="text-sm uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors"
				>
					Sign out
				</button>
			</div>
		</div>

		<!-- Tabs -->
		<nav class="mt-6 flex flex-wrap gap-1">
			{#each tabs as tab}
				<button
					class="px-4 py-2 text-sm rounded-md transition-colors {activeTab === tab.id
						? 'bg-white/15 text-white'
						: 'text-white/50 hover:text-white/80 hover:bg-white/5'}"
					onclick={() => (activeTab = tab.id)}
				>
					{tab.label}{tab.count !== undefined ? ` (${tab.count})` : ''}
				</button>
			{/each}
		</nav>
	</header>

	<!-- Feedback toast -->
	{#if feedback}
		<div class="fixed top-6 right-6 z-50 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-sm text-emerald-300">
			{feedback}
		</div>
	{/if}

	<div class="g-px py-10">

		<!-- ── Projects ─────────────────────────────────────────────────────── -->
		{#if activeTab === 'projects'}
			<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
				<Card class="holo-card p-8">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-semibold">{editingProjectId ? 'Edit project' : 'Add project'}</h2>
						<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={resetProjectForm}>Reset</Button>
					</div>
					<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); void saveProject(); }}>
						<div>
							<label class="label" for="p-title">Title</label>
							<Input id="p-title" bind:value={projectForm.title} placeholder="Atlas Finance Platform" />
						</div>
						<div>
							<label class="label" for="p-summary">Summary</label>
							<Textarea id="p-summary" bind:value={projectForm.summary} rows={3} placeholder="Brief description" />
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="p-role">Role</label>
								<Input id="p-role" bind:value={projectForm.role} placeholder="Lead Engineer" />
							</div>
							<div>
								<label class="label" for="p-impact">Impact</label>
								<Input id="p-impact" bind:value={projectForm.impact} placeholder="Improved latency by 42%" />
							</div>
						</div>
						<div class="grid gap-4 md:grid-cols-3">
							<div>
								<label class="label" for="p-year">Year</label>
								<Input id="p-year" bind:value={projectForm.year} />
							</div>
							<div>
								<label class="label" for="p-status">Status</label>
								<select id="p-status" bind:value={projectForm.status} class="select">
									{#each statusOptions as s}<option value={s}>{s}</option>{/each}
								</select>
							</div>
							<div>
								<label class="label" for="p-stack">Stack (comma-sep)</label>
								<Input
									id="p-stack"
									value={projectForm.stack.join(', ')}
									oninput={(e) => { projectForm.stack = (e.target as HTMLInputElement).value.split(','); }}
									placeholder="React, Go, AWS"
								/>
							</div>
						</div>
						<Button disabled={saving} class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30">
							{editingProjectId ? 'Update project' : 'Add project'}
						</Button>
					</form>
				</Card>

				<div class="space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
					{#each projects as p (p.id)}
						<Card class="holo-card p-5 flex flex-col gap-3">
							<div class="flex items-start justify-between gap-2">
								<div>
									<p class="font-semibold">{p.title}</p>
									<p class="text-xs text-white/50 mt-0.5">{p.year} · {p.status}</p>
								</div>
								<div class="flex gap-2 shrink-0">
									<Button variant="outline" class="border-cyan-100/40 bg-white/10 text-xs py-1 px-3 h-auto" onclick={() => editProject(p)}>Edit</Button>
									<Button variant="ghost" class="border border-red-300/30 bg-red-500/20 text-red-200 hover:bg-red-500/30 text-xs py-1 px-3 h-auto" onclick={() => void deleteProject(p.id)}>Delete</Button>
								</div>
							</div>
							<p class="text-sm text-white/70">{p.summary}</p>
							<div class="flex flex-wrap gap-1">
								{#each p.stack as tech}<Badge variant="outline" class="text-[10px] px-2 py-0.5 normal-case">{tech}</Badge>{/each}
							</div>
						</Card>
					{/each}
					{#if !projects.length}
						<p class="text-white/40 text-sm">No projects yet. Add one above.</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- ── Work Projects ──────────────────────────────────────────────── -->
		{#if activeTab === 'work'}
			<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
				<Card class="holo-card p-8">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-semibold">{editingWorkSlug ? 'Edit work project' : 'Add work project'}</h2>
						<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={resetWorkForm}>Reset</Button>
					</div>
					<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); void saveWork(); }}>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="w-slug">Slug (unique ID)</label>
								<Input id="w-slug" bind:value={workForm.slug} placeholder="atlas-finance" />
							</div>
							<div>
								<label class="label" for="w-year">Year</label>
								<Input id="w-year" bind:value={workForm.year} />
							</div>
						</div>
						<div>
							<label class="label" for="w-title">Title</label>
							<Input id="w-title" bind:value={workForm.title} placeholder="Atlas Finance" />
						</div>
						<div>
							<label class="label" for="w-role">Role</label>
							<Input id="w-role" bind:value={workForm.role} placeholder="Lead Frontend & Cloud Engineer" />
						</div>
						<div>
							<label class="label" for="w-blurb">Blurb</label>
							<Textarea id="w-blurb" bind:value={workForm.blurb} rows={3} placeholder="Short description with impact..." />
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="w-tags">Tags (comma-sep)</label>
								<Input id="w-tags" value={workForm.tags.join(', ')} oninput={(e) => { workForm.tags = (e.target as HTMLInputElement).value.split(','); }} placeholder="SaaS, Internal tools" />
							</div>
							<div>
								<label class="label" for="w-stack">Stack (comma-sep)</label>
								<Input id="w-stack" value={workForm.stack.join(', ')} oninput={(e) => { workForm.stack = (e.target as HTMLInputElement).value.split(','); }} placeholder="React, Golang, AWS" />
							</div>
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="w-thumb">Thumb variant</label>
								<Input id="w-thumb" bind:value={workForm.thumbVariant} placeholder="tradewind" />
							</div>
							<div>
								<label class="label" for="w-caption">Thumb caption</label>
								<Input id="w-caption" bind:value={workForm.thumbCaption} placeholder="Fintech SaaS · Shipped" />
							</div>
						</div>
						<!-- Stats -->
						<div>
							<div class="flex items-center justify-between mb-2">
								<label class="label">Stats</label>
								<button type="button" class="text-xs text-cyan-300 hover:text-cyan-100" onclick={addStat}>+ Add stat</button>
							</div>
							{#each workForm.stats as stat, i}
								<div class="flex gap-2 mb-2">
									<Input value={(stat as ProjectStat).v} oninput={(e) => { (workForm.stats[i] as ProjectStat).v = (e.target as HTMLInputElement).value; }} placeholder="62%" class="w-24" />
									<Input value={(stat as ProjectStat).l} oninput={(e) => { (workForm.stats[i] as ProjectStat).l = (e.target as HTMLInputElement).value; }} placeholder="Faster reporting" />
									<button type="button" class="text-red-400 hover:text-red-200 text-sm px-2" onclick={() => removeStat(i)}>✕</button>
								</div>
							{/each}
						</div>
						<Button disabled={saving} class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30">
							{editingWorkSlug ? 'Update work project' : 'Add work project'}
						</Button>
					</form>
				</Card>

				<div class="space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
					{#each workProjects as w (w.id)}
						<Card class="holo-card p-5 flex flex-col gap-3">
							<div class="flex items-start justify-between gap-2">
								<div>
									<p class="font-semibold">{w.title}</p>
									<p class="text-xs text-white/50 mt-0.5">{w.year} · {w.id}</p>
								</div>
								<div class="flex gap-2 shrink-0">
									<Button variant="outline" class="border-cyan-100/40 bg-white/10 text-xs py-1 px-3 h-auto" onclick={() => editWork(w)}>Edit</Button>
									<Button variant="ghost" class="border border-red-300/30 bg-red-500/20 text-red-200 hover:bg-red-500/30 text-xs py-1 px-3 h-auto" onclick={() => void deleteWork(w.id)}>Delete</Button>
								</div>
							</div>
							<p class="text-sm text-white/70 line-clamp-2">{w.blurb}</p>
						</Card>
					{/each}
					{#if !workProjects.length}
						<p class="text-white/40 text-sm">No work projects yet.</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- ── Experience ────────────────────────────────────────────────────── -->
		{#if activeTab === 'experience'}
			<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
				<Card class="holo-card p-8">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-semibold">{editingExpId ? 'Edit entry' : 'Add entry'}</h2>
						<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={resetExpForm}>Reset</Button>
					</div>
					<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); void saveExp(); }}>
						<div>
							<label class="label" for="e-when">Period</label>
							<Input id="e-when" bind:value={expForm.when} placeholder="2025 to now" />
						</div>
						<div>
							<label class="label" for="e-role">Role</label>
							<Input id="e-role" bind:value={expForm.role} placeholder="Senior Software Engineer" />
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="e-co">Company</label>
								<Input id="e-co" bind:value={expForm.co} placeholder="AmaliTech, Ghana" />
							</div>
							<div>
								<label class="label" for="e-place">Location</label>
								<Input id="e-place" bind:value={expForm.place} placeholder="Accra, GH" />
							</div>
						</div>
						<div>
							<label class="label" for="e-body">Description</label>
							<Textarea id="e-body" bind:value={expForm.body} rows={4} placeholder="What you did and impact..." />
						</div>
						<label class="flex items-center gap-3 cursor-pointer">
							<input type="checkbox" bind:checked={expForm.current} class="w-4 h-4 accent-cyan-400" />
							<span class="text-sm text-white/70">Current position</span>
						</label>
						<Button disabled={saving} class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30">
							{editingExpId ? 'Update entry' : 'Add entry'}
						</Button>
					</form>
				</Card>

				<div class="space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
					{#each experience as e (e.id)}
						<Card class="holo-card p-5 flex flex-col gap-3">
							<div class="flex items-start justify-between gap-2">
								<div>
									<p class="font-semibold">{e.role}</p>
									<p class="text-xs text-white/50 mt-0.5">{e.co} · {e.when}</p>
								</div>
								<div class="flex gap-2 shrink-0">
									{#if e.current}<Badge class="chip text-[10px]">Current</Badge>{/if}
									<Button variant="outline" class="border-cyan-100/40 bg-white/10 text-xs py-1 px-3 h-auto" onclick={() => editExp(e)}>Edit</Button>
									<Button variant="ghost" class="border border-red-300/30 bg-red-500/20 text-red-200 hover:bg-red-500/30 text-xs py-1 px-3 h-auto" onclick={() => void deleteExp(e.id)}>Delete</Button>
								</div>
							</div>
							<p class="text-sm text-white/70 line-clamp-2">{e.body}</p>
						</Card>
					{/each}
					{#if !experience.length}
						<p class="text-white/40 text-sm">No experience entries yet.</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- ── Stack ─────────────────────────────────────────────────────────── -->
		{#if activeTab === 'stack'}
			<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
				<Card class="holo-card p-8">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-semibold">{editingStackId ? 'Edit group' : 'Add group'}</h2>
						<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={resetStackForm}>Reset</Button>
					</div>
					<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); void saveStack(); }}>
						<div>
							<label class="label" for="s-name">Group name</label>
							<Input id="s-name" bind:value={stackForm.name} placeholder="Frontend" />
						</div>
						<div>
							<label class="label" for="s-note">Note</label>
							<Input id="s-note" bind:value={stackForm.note} placeholder="Primary UI toolkit" />
						</div>
						<div>
							<label class="label" for="s-items">Technologies (comma-sep)</label>
							<Textarea
								id="s-items"
								value={stackForm.items.join(', ')}
								oninput={(e) => { stackForm.items = (e.target as HTMLTextAreaElement).value.split(','); }}
								rows={3}
								placeholder="React, Svelte, Vue"
							/>
						</div>
						<Button disabled={saving} class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30">
							{editingStackId ? 'Update group' : 'Add group'}
						</Button>
					</form>
				</Card>

				<div class="space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
					{#each stack as s (s.id)}
						<Card class="holo-card p-5 flex flex-col gap-3">
							<div class="flex items-start justify-between gap-2">
								<div>
									<p class="font-semibold">{s.name}</p>
									<p class="text-xs text-white/50 mt-0.5">{s.note}</p>
								</div>
								<div class="flex gap-2 shrink-0">
									<Button variant="outline" class="border-cyan-100/40 bg-white/10 text-xs py-1 px-3 h-auto" onclick={() => editStack(s)}>Edit</Button>
									<Button variant="ghost" class="border border-red-300/30 bg-red-500/20 text-red-200 hover:bg-red-500/30 text-xs py-1 px-3 h-auto" onclick={() => void deleteStack(s.id)}>Delete</Button>
								</div>
							</div>
							<div class="flex flex-wrap gap-1">
								{#each s.items as item}<Badge variant="outline" class="text-[10px] px-2 py-0.5 normal-case">{item}</Badge>{/each}
							</div>
						</Card>
					{/each}
					{#if !stack.length}
						<p class="text-white/40 text-sm">No stack groups yet.</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- ── Person / Profile ──────────────────────────────────────────────── -->
		{#if activeTab === 'person'}
			<div class="max-w-2xl">
				<Card class="holo-card p-8">
					<h2 class="text-xl font-semibold mb-6">Profile</h2>
					<form class="space-y-4" onsubmit={(e) => { e.preventDefault(); void savePerson(); }}>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="pr-name">Full name</label>
								<Input id="pr-name" bind:value={personForm.name} placeholder="Emmanuel Kpendo" />
							</div>
							<div>
								<label class="label" for="pr-initials">Initials</label>
								<Input id="pr-initials" bind:value={personForm.initials} placeholder="EK" />
							</div>
						</div>
						<div>
							<label class="label" for="pr-role">Role / title</label>
							<Input id="pr-role" bind:value={personForm.role} placeholder="Senior Software Engineer" />
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<label class="label" for="pr-location">Location</label>
								<Input id="pr-location" bind:value={personForm.location} placeholder="Accra, Ghana" />
							</div>
							<div>
								<label class="label" for="pr-available">Availability</label>
								<Input id="pr-available" bind:value={personForm.available} placeholder="Open to opportunities" />
							</div>
						</div>
						<div>
							<label class="label" for="pr-email">Email</label>
							<Input id="pr-email" type="email" bind:value={personForm.email} />
						</div>
						<div class="grid gap-4 md:grid-cols-3">
							<div>
								<label class="label" for="pr-github">GitHub URL</label>
								<Input id="pr-github" bind:value={personForm.links.github} placeholder="https://github.com/…" />
							</div>
							<div>
								<label class="label" for="pr-linkedin">LinkedIn URL</label>
								<Input id="pr-linkedin" bind:value={personForm.links.linkedin} placeholder="https://linkedin.com/in/…" />
							</div>
							<div>
								<label class="label" for="pr-twitter">Twitter URL</label>
								<Input id="pr-twitter" bind:value={personForm.links.twitter} placeholder="https://x.com/…" />
							</div>
						</div>

						<!-- Facts -->
						<div>
							<div class="flex items-center justify-between mb-2">
								<label class="label">Quick facts</label>
								<button type="button" class="text-xs text-cyan-300 hover:text-cyan-100" onclick={addFact}>+ Add fact</button>
							</div>
							{#each personForm.facts as fact, i}
								<div class="flex gap-2 mb-2">
									<Input bind:value={fact.k} placeholder="Key (e.g. Coffee consumed)" class="w-48" />
									<Input bind:value={fact.v} placeholder="Value (e.g. ∞ cups)" />
									<button type="button" class="text-red-400 hover:text-red-200 text-sm px-2" onclick={() => removeFact(i)}>✕</button>
								</div>
							{/each}
						</div>

						<Button disabled={saving} class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30">
							Save profile
						</Button>
					</form>
				</Card>
			</div>
		{/if}

	</div>
</div>

{/if}

<style>
	:global(.label) {
		display: block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: rgb(255 255 255 / 0.4);
		margin-bottom: 0.35rem;
	}
	:global(.select) {
		height: 2.25rem;
		width: 100%;
		border-radius: 0.375rem;
		border: 1px solid rgb(255 255 255 / 0.15);
		background: rgb(255 255 255 / 0.08);
		padding: 0 0.75rem;
		font-size: 0.875rem;
		color: white;
		outline: none;
		cursor: pointer;
	}
</style>
