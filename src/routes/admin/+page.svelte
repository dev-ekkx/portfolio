<script lang="ts">
	import { projects, type Project } from '$lib/stores/projects';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	const statusOptions: Project['status'][] = ['Shipped', 'Scaling', 'In Discovery', 'Archived'];

	let editingId = $state<string | null>(null);
	let statusSelection = $state<string[]>(['In Discovery']);
	let form = $state<Project>({
		id: '',
		title: '',
		summary: '',
		role: '',
		impact: '',
		year: new Date().getFullYear().toString(),
		status: 'In Discovery',
		stack: []
	});

	const resetForm = () => {
		editingId = null;
		statusSelection = ['In Discovery'];
		form = {
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

	const handleSubmit = () => {
		if (!form.title.trim()) return;

		const payload: Project = {
			...form,
			id: editingId ?? (globalThis.crypto?.randomUUID?.() ?? `proj-${Date.now()}`),
			stack: form.stack.map((item) => item.trim()).filter(Boolean)
		};

		if (editingId) {
			projects.updateProject(payload);
		} else {
			projects.add(payload);
		}
		resetForm();
	};

	const handleEdit = (project: Project) => {
		editingId = project.id;
		statusSelection = [project.status];
		form = { ...project };
	};

	const handleDelete = (id: string) => {
		projects.remove(id);
		if (editingId === id) resetForm();
	};

	$effect(() => {
		const selectedStatus = statusSelection[0] as Project['status'] | undefined;
		if (selectedStatus) form.status = selectedStatus;
	});
</script>

<svelte:head>
	<title>Project Admin | Emmanuel Kpendo</title>
</svelte:head>

<div class="min-h-screen">
	<header class="g-px pt-10 pb-6">
		<div class="flex flex-wrap items-center justify-between gap-6">
			<div>
				<Badge class="chip">Admin suite</Badge>
				<h1 class="mt-4 text-3xl md:text-4xl">Project control center</h1>
				<p class="mt-2 text-white/80">
					Manage case studies, update tech stacks, and keep the portfolio fresh.
				</p>
			</div>
			<a class="text-sm uppercase tracking-[0.3em] text-cyan-100/80" href="/">Back to site</a>
		</div>
	</header>

	<section class="g-px pb-16">
		<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
			<Card class="holo-card p-8">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">{editingId ? 'Edit project' : 'Add new project'}</h2>
					<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={resetForm}>Reset</Button>
				</div>
				<form class="mt-6 space-y-4" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
					<div>
						<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-title">Project title</label>
						<Input id="project-title" bind:value={form.title} placeholder="Atlas Finance Platform" />
					</div>
					<div>
						<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-summary">Summary</label>
						<Textarea
							id="project-summary"
							bind:value={form.summary}
							rows={4}
							placeholder="Brief description"
						></Textarea>
					</div>
					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-role">Role</label>
							<Input id="project-role" bind:value={form.role} placeholder="Lead Engineer" />
						</div>
						<div>
							<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-impact">Impact</label>
							<Input id="project-impact" bind:value={form.impact} placeholder="Improved latency by 42%" />
						</div>
					</div>
					<div class="grid gap-4 md:grid-cols-3">
						<div>
							<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-year">Year</label>
							<Input id="project-year" bind:value={form.year} />
						</div>
						<div>
							<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-status">Status</label>
							<Select type="multiple" bind:value={statusSelection}>
								<SelectTrigger id="project-status" class="w-full border-cyan-100/35 bg-white/10 text-white">
									{statusSelection[0] ?? 'Select status'}
								</SelectTrigger>
								<SelectContent>
								{#each statusOptions as status}
									<SelectItem value={status} label={status} />
								{/each}
								</SelectContent>
							</Select>
						</div>
						<div>
							<label class="text-xs uppercase tracking-[0.2em] text-white/40" for="project-stack">Stack</label>
							<Input
								id="project-stack"
								value={form.stack.join(', ')}
								oninput={(event) => {
									const target = event.target as HTMLInputElement;
									form.stack = target.value.split(',');
								}}
								placeholder="React, Next.js, AWS"
							/>
						</div>
					</div>
					<Button
						class="w-full border-none bg-[linear-gradient(90deg,#7ceeff,#8effd2)] text-slate-900 shadow-lg shadow-cyan-300/30 hover:brightness-105"
					>
						{editingId ? 'Update project' : 'Add project'}
					</Button>
				</form>
			</Card>

			<div class="space-y-6">
				<Card class="holo-card p-6">
					<p class="text-sm uppercase tracking-[0.3em] text-white/50">Project inventory</p>
					<p class="mt-2 text-4xl font-semibold">{$projects.length}</p>
					<p class="mt-2 text-sm text-white/80">Active case studies across enterprise + SaaS.</p>
					<Button variant="outline" class="mt-6 border-cyan-100/40 bg-white/10" onclick={() => projects.reset()}>Restore defaults</Button>
				</Card>
				<Card class="holo-card p-6">
					<p class="text-sm uppercase tracking-[0.3em] text-white/50">Notes</p>
					<p class="mt-3 text-sm text-white/80">
						Changes are saved locally in your browser. Connect this panel to a backend when you are ready
						to publish updates for clients.
					</p>
				</Card>
			</div>
		</div>
	</section>

	<section class="g-px pb-16">
		<div class="grid gap-6 lg:grid-cols-3">
			{#each $projects as project}
				<Card class="holo-card p-6 flex flex-col gap-4">
					<div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
						<span>{project.year}</span>
						<span>{project.status}</span>
					</div>
					<h3 class="text-lg font-semibold">{project.title}</h3>
					<p class="text-sm text-white/85">{project.summary}</p>
					<div class="flex flex-wrap gap-2">
						{#each project.stack as tech}
							<Badge variant="outline" class="px-3 py-1 text-[11px] normal-case tracking-normal">{tech}</Badge>
						{/each}
					</div>
					<div class="flex flex-wrap gap-3">
						<Button variant="outline" class="border-cyan-100/40 bg-white/10" onclick={() => handleEdit(project)}>Edit</Button>
						<Button variant="ghost" class="border border-red-300/30 bg-red-500/20 text-red-200 hover:bg-red-500/30" onclick={() => handleDelete(project.id)}>
							Delete
						</Button>
					</div>
				</Card>
			{/each}
		</div>
	</section>
</div>
