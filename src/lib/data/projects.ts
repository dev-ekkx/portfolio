import type { Project, WorkProject } from '$lib/interfaces';

export type ProjectSeed = Omit<Project, 'id'>;

export const defaultProjects: ProjectSeed[] = [
	{
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

export const PROJECT_TAGS = ['All', 'SaaS', 'Internal tools', 'Open Source', 'Side project'];

export const PROJECTS: WorkProject[] = [
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
