import type { StackGroup } from '$lib/interfaces';

export const STACK: StackGroup[] = [
	{
		name: 'Languages',
		note: 'Where I think',
		items: ['TypeScript', 'Go', 'SQL', 'Python', 'HTML/CSS']
	},
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
