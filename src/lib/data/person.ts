import type { Fact, Person } from '$lib/types';

export const PERSON: Person = {
	name: 'Emmanuel Kpendo',
	initials: 'EK',
	role: 'Software Engineer',
	location: 'Accra, Ghana',
	email: 'hello@emmanuelkpendo.dev',
	links: {
		github: 'https://github.com/emmanuelkpendo',
		linkedin: 'https://linkedin.com/in/emmanuel-konla-kpendo',
		twitter: '#'
	},
	available: 'Open to Q3 2026'
};

export const FACTS: Fact[] = [
	{ k: 'Currently building', v: 'Cloud-native platforms' },
	{ k: 'Currently reading', v: 'Designing Data-Intensive Apps' },
	{ k: 'Open to', v: 'Q3 2026 roles' },
	{ k: 'Time zone', v: 'GMT, UTC+0' },
	{ k: 'Last shipped', v: 'This week' },
	{ k: 'Heaviest stack', v: 'TS + Postgres + AWS' }
];
