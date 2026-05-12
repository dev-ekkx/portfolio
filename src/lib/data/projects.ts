import type { Project } from '$lib/types';

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
