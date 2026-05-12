import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Project } from '$lib/types';

const STORAGE_KEY = 'portfolio_projects_v1';

const defaultProjects: Project[] = [
	{
		id: 'atlas-finance',
		title: 'Atlas Finance Platform',
		summary:
			'Unified treasury and analytics suite for multi-entity fintech operations with real-time insights and automated compliance.',
		role: 'Lead Frontend & Cloud Engineer',
		impact: 'Cut reporting time by 62% and improved release velocity by 3x.',
		year: '2025',
		status: 'Shipped',
		stack: ['Next.js', 'React', 'Golang', 'Postgres', 'SQLC', 'AWS ECS']
	},
	{
		id: 'aeron-ops',
		title: 'Aeron Ops Console',
		summary:
			'Operations command center for aviation logistics with predictive ETAs, live fleet health, and incident response workflows.',
		role: 'Senior UI Engineer',
		impact: 'Reduced manual dispatching by 48% and improved on-time deliveries.',
		year: '2024',
		status: 'Shipped',
		stack: ['Angular', 'RxJS', 'SvelteKit', 'AWS Lambda', 'EventBridge']
	},
	{
		id: 'aurora-cloud',
		title: 'Aurora Cloud Studio',
		summary:
			'Design system and deployment toolkit for enterprise SaaS teams with automated infra provisioning and CI visibility.',
		role: 'Staff Software Engineer',
		impact: 'Accelerated new product launches from weeks to days.',
		year: '2023',
		status: 'Scaling',
		stack: ['Vue', 'Vite', 'Golang', 'Terraform', 'AWS RDS']
	}
];

const loadProjects = (): Project[] => {
	if (!browser) return defaultProjects;
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return defaultProjects;
	try {
		const parsed = JSON.parse(raw) as Project[];
		return parsed.length ? parsed : defaultProjects;
	} catch {
		return defaultProjects;
	}
};

const { subscribe, set, update } = writable<Project[]>(loadProjects());

let hydrated = false;
if (browser) {
	subscribe((value) => {
		if (!hydrated) {
			hydrated = true;
			return;
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

export const projects = {
	subscribe,
	set,
	add: (project: Project) => update((items) => [project, ...items]),
	updateProject: (project: Project) =>
		update((items) => items.map((item) => (item.id === project.id ? project : item))),
	remove: (id: string) => update((items) => items.filter((item) => item.id !== id)),
	reset: () => set(defaultProjects)
};

export type { Project };
