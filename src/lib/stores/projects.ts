import { writable } from 'svelte/store';
import { defaultProjects } from '$lib/data/projects';
import type { Project } from '$lib/types';

const { subscribe, set, update } = writable<Project[]>([]);
let localCounter = 0;

const makeLocalId = () => {
	localCounter += 1;
	return `local-${Date.now()}-${localCounter}`;
};

const cleanPayload = (project: Omit<Project, 'id'>): Omit<Project, 'id'> => ({
	title: project.title.trim(),
	summary: project.summary.trim(),
	role: project.role.trim(),
	impact: project.impact.trim(),
	year: project.year.trim(),
	status: project.status,
	stack: project.stack.map((item) => item.trim()).filter(Boolean)
});

const hydrateDefaults = () => set(defaultProjects.map((project, index) => ({ ...project, id: `default-${index}` })));

export const projects = {
	subscribe,
	load: async (fetchFn: typeof fetch = fetch) => {
		try {
			const res = await fetchFn('/api/projects');
			if (!res.ok) throw new Error('Failed to load projects');
			const data = (await res.json()) as Project[];
			set(data);
		} catch {
			hydrateDefaults();
		}
	},
	add: async (project: Omit<Project, 'id'>, fetchFn: typeof fetch = fetch) => {
		const payload = cleanPayload(project);
		let created: Project;
		try {
			const res = await fetchFn('/api/projects', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error('Unable to create project');
			created = (await res.json()) as Project;
		} catch {
			created = { ...payload, id: makeLocalId() };
		}
		update((items) => [created, ...items]);
		return created;
	},
	updateProject: async (project: Project, fetchFn: typeof fetch = fetch) => {
		const payload = cleanPayload(project);
		let updatedProject: Project;
		try {
			const res = await fetchFn(`/api/projects/${project.id}`, {
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error('Unable to update project');
			updatedProject = (await res.json()) as Project;
		} catch {
			updatedProject = { ...payload, id: project.id };
		}
		update((items) => items.map((item) => (item.id === updatedProject.id ? updatedProject : item)));
		return updatedProject;
	},
	remove: async (id: string, fetchFn: typeof fetch = fetch) => {
		try {
			const res = await fetchFn(`/api/projects/${id}`, { method: 'DELETE' });
			if (!res.ok && res.status !== 204) throw new Error('Unable to delete project');
		} catch {
			// Keep client responsive even if DB is temporarily unavailable.
		}
		update((items) => items.filter((item) => item.id !== id));
	},
	reset: async (fetchFn: typeof fetch = fetch) => {
		try {
			const res = await fetchFn('/api/projects/reset', { method: 'POST' });
			if (!res.ok) throw new Error('Unable to reset projects');
			const data = (await res.json()) as Project[];
			set(data);
		} catch {
			hydrateDefaults();
		}
	}
};

export type { Project };
